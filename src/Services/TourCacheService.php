<?php

namespace Taoshan\LaravelOnboardingTour\Services;

use Illuminate\Support\Facades\Cache;
use Taoshan\LaravelOnboardingTour\Models\OnboardingTour;
use Taoshan\LaravelOnboardingTour\Models\OnboardingTourUser;

class TourCacheService
{
    private const DEFAULT_THEME = [
        'use_custom_theme' => false,
        'card_style'       => 'auto',
        'accent_color'     => '#2563eb',
        'card_radius'      => '20px',
        'highlight_style'  => 'minimal',
        'backdrop_hex'     => '#0f172a',
        'backdrop_opacity' => 75,
        'backdrop_color'   => 'rgba(15, 23, 42, 0.75)',
    ];
    private const GLOBAL_THEME_ROUTE = '__global_theme__';

    public static function getGlobalTheme(): array
    {
        $prefix = config('onboarding-tour.cache_prefix', 'onboarding_tour:');
        $cacheKey = "{$prefix}global_theme";

        return Cache::rememberForever($cacheKey, function () {
            try {
                $row = OnboardingTour::where('route_name', self::GLOBAL_THEME_ROUTE)->first();
                if ($row && is_array($row->theme_settings)) {
                    return array_merge(self::DEFAULT_THEME, $row->theme_settings);
                }
            } catch (\Throwable $e) {}

            return self::DEFAULT_THEME;
        });
    }

    public static function setGlobalTheme(array $themeData): array
    {
        $prefix = config('onboarding-tour.cache_prefix', 'onboarding_tour:');
        $cacheKey = "{$prefix}global_theme";

        $current = self::getGlobalTheme();
        $updated = array_merge($current, $themeData, ['use_custom_theme' => false]);

        // Persist to DB
        try {
            OnboardingTour::updateOrCreate(
                ['route_name' => self::GLOBAL_THEME_ROUTE],
                ['title' => 'Global Theme', 'theme_settings' => $updated, 'is_active' => false]
            );
        } catch (\Throwable $e) {}

        // Update cache
        Cache::forever($cacheKey, $updated);

        // Clear all route tour caches so all tours immediately reflect the new global theme
        try {
            OnboardingTour::where('route_name', '!=', self::GLOBAL_THEME_ROUTE)
                ->select('route_name')->get()
                ->each(fn($tour) => Cache::forget("{$prefix}route:{$tour->route_name}"));
        } catch (\Throwable $e) {}

        return $updated;
    }

    public static function getTourForRoute(string $routeName, mixed $user = null): ?array
    {
        if (!config('onboarding-tour.enabled', true)) {
            return null;
        }

        $ttl = config('onboarding-tour.cache_ttl', 86400);
        $prefix = config('onboarding-tour.cache_prefix', 'onboarding_tour:');
        $cacheKey = "{$prefix}route:{$routeName}";
        $globalTheme = self::getGlobalTheme();

        $tourData = Cache::remember($cacheKey, $ttl, function () use ($routeName, $globalTheme) {
            $tour = OnboardingTour::where('route_name', $routeName)
                ->where('is_active', true)
                ->with(['steps' => function ($q) {
                    $q->orderBy('sort_order', 'asc');
                }])
                ->first();

            if (!$tour) {
                return null;
            }

            $tourThemeSettings = $tour->theme_settings ?? [];
            $useCustom = isset($tourThemeSettings['use_custom_theme']) ? (bool) $tourThemeSettings['use_custom_theme'] : false;

            $effectiveTheme = $useCustom
                ? array_merge($globalTheme, $tourThemeSettings, ['use_custom_theme' => true])
                : array_merge($globalTheme, ['use_custom_theme' => false]);

            return [
                'id' => $tour->id,
                'route_name' => $tour->route_name,
                'title' => $tour->title,
                'description' => $tour->description,
                'auto_start' => $tour->auto_start,
                'highlight_theme' => $tour->highlight_theme ?? 'minimal',
                'theme_settings' => $effectiveTheme,
                'global_theme' => $globalTheme,
                'steps' => $tour->steps->map(fn($s) => [
                    'id' => $s->id,
                    'element_selector' => $s->element_selector,
                    'target_text' => $s->target_text,
                    'title' => $s->title,
                    'description' => $s->description,
                    'video_url' => $s->video_url,
                    'card_size' => $s->card_size ?? 'md',
                    'position' => $s->position,
                    'sort_order' => $s->sort_order,
                ])->toArray(),
            ];
        });

        if (!$tourData) {
            return null;
        }

        // Resolve translations + add i18n fields in one pass (raw data is cached, locale is resolved per-request)
        $locale = app()->getLocale();
        $fallback = config('app.fallback_locale', 'it');

        $tourData['steps'] = array_map(function ($s) use ($locale, $fallback) {
            $s['title_i18n'] = $s['title'];
            $s['description_i18n'] = $s['description'];
            $s['video_url_i18n'] = $s['video_url'];
            $s['title'] = self::resolveTranslation($s['title'], $locale, $fallback) ?? '';
            $s['description'] = self::resolveTranslation($s['description'], $locale, $fallback) ?? '';
            $s['video_url'] = self::resolveTranslation($s['video_url'], $locale, $fallback);
            return $s;
        }, $tourData['steps']);

        // Check user completion status (polymorphic model support)
        $completed = $dismissed = false;
        if ($user) {
            $userType = is_object($user) && method_exists($user, 'getMorphClass')
                ? $user->getMorphClass()
                : (config('auth.providers.users.model') ?? 'App\Models\User');

            $userId = is_object($user) && method_exists($user, 'getKey')
                ? $user->getKey()
                : $user;

            if ($userId) {
                $record = OnboardingTourUser::where('user_type', $userType)
                    ->where('user_id', $userId)
                    ->where('tour_id', $tourData['id'])
                    ->first();

                if ($record) {
                    $completed = !is_null($record->completed_at);
                    $dismissed = !is_null($record->dismissed_at);
                }
            }
        }

        $tourData['user_completed'] = $completed;
        $tourData['user_dismissed'] = $dismissed;
        $tourData['should_auto_start'] = $tourData['auto_start'] && !$completed && !$dismissed;
        $tourData['global_theme'] = $globalTheme;

        return $tourData;
    }

    public static function resolveTranslation(mixed $data, ?string $locale = null, ?string $fallback = 'it'): ?string
    {
        if (is_string($data)) {
            return $data;
        }

        if (is_array($data)) {
            $locale = $locale ?? app()->getLocale();
            $fallback = $fallback ?? config('app.fallback_locale', 'it');

            if (isset($data[$locale]) && $data[$locale] !== '') {
                return $data[$locale];
            }

            if (isset($data[$fallback]) && $data[$fallback] !== '') {
                return $data[$fallback];
            }

            foreach ($data as $val) {
                if (is_string($val) && $val !== '') {
                    return $val;
                }
            }
        }

        return null;
    }

    public static function discoverHostLocales(): array
    {
        // 1. Explicit package config — highest priority
        $explicit = config('onboarding-tour.locales');
        if (is_array($explicit) && !empty($explicit)) {
            return $explicit;
        }

        // 2. Common host app config keys
        $discovered = (array) (config('app.locales') ?? config('app.available_locales') ?? config('app.supported_locales') ?? []);

        // 3. Scan lang directory for locale folders/JSON files
        $langDir = function_exists('lang_path') ? lang_path() : resource_path('lang');
        if (is_dir($langDir)) {
            $pattern = '/^[a-z]{2,3}(_[A-Z]{2,4})?$/i';
            foreach (glob($langDir . '/*', GLOB_ONLYDIR) as $d) {
                $name = basename($d);
                if ($name !== 'vendor' && preg_match($pattern, $name)) $discovered[] = strtolower($name);
            }
            foreach (glob($langDir . '/*.json') as $f) {
                $name = pathinfo($f, PATHINFO_FILENAME);
                if (preg_match($pattern, $name)) $discovered[] = strtolower($name);
            }
        }

        // 4. Always include active + fallback
        $discovered[] = app()->getLocale();
        if ($fb = config('app.fallback_locale')) $discovered[] = $fb;

        $result = array_values(array_unique(array_filter($discovered)));
        return !empty($result) ? $result : ['it', 'en'];
    }

    public static function flushCacheForRoute(string $routeName): void
    {
        $prefix = config('onboarding-tour.cache_prefix', 'onboarding_tour:');
        Cache::forget("{$prefix}route:{$routeName}");
    }
}
