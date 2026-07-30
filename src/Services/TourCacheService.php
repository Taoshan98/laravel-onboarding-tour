<?php

namespace Taoshan\LaravelOnboardingTour\Services;

use Illuminate\Contracts\Cache\Repository;
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

    /**
     * Get the configured cache store instance (Redis or default), tagged if supported.
     */
    public static function store(): Repository
    {
        $storeName = config('onboarding-tour.cache_store');
        $store = $storeName ? Cache::store($storeName) : Cache::store();

        if (config('onboarding-tour.use_cache_tags', true) && method_exists($store->getStore(), 'tags')) {
            return $store->tags(['onboarding_tour']);
        }

        return $store;
    }

    /**
     * Get or cache the global visual theme settings.
     */
    public static function getGlobalTheme(): array
    {
        $prefix = config('onboarding-tour.cache_prefix', 'onboarding_tour:');
        $cacheKey = "{$prefix}global_theme";
        $ttl = config('onboarding-tour.cache_ttl', 86400);

        return self::store()->remember($cacheKey, $ttl, function () {
            try {
                $row = OnboardingTour::where('route_name', self::GLOBAL_THEME_ROUTE)->first();
                if ($row && is_array($row->theme_settings)) {
                    return array_merge(self::DEFAULT_THEME, $row->theme_settings);
                }
            } catch (\Throwable $e) {}

            return self::DEFAULT_THEME;
        });
    }

    /**
     * Update global theme and flush theme dependent caches.
     */
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

        // Update cache & flush dependent route caches
        self::store()->put($cacheKey, $updated, config('onboarding-tour.cache_ttl', 86400));
        self::flushAllCaches();

        return $updated;
    }

    /**
     * Get cached list of active tours for API listing / import modal.
     */
    public static function getCachedToursList(): array
    {
        $prefix = config('onboarding-tour.cache_prefix', 'onboarding_tour:');
        $cacheKey = "{$prefix}tours_list";
        $ttl = config('onboarding-tour.cache_ttl', 86400);

        return self::store()->remember($cacheKey, $ttl, function () {
            try {
                $tours = OnboardingTour::where('is_active', true)
                    ->where('route_name', '!=', self::GLOBAL_THEME_ROUTE)
                    ->withCount('steps')
                    ->with(['steps' => fn($q) => $q->orderBy('sort_order', 'asc')])
                    ->get();

                return $tours->map(function ($tour) {
                    $normalized = self::normalizeRoutePattern($tour->route_name);
                    $title = $tour->title ? trim($tour->title) : '';
                    if (!$title || $title === "Tour {$tour->route_name}" || $title === "Tour {$normalized}") {
                        $title = "Tour: {$normalized}";
                    }

                    return [
                        'id' => $tour->id,
                        'route_name' => $normalized,
                        'raw_route_name' => $tour->route_name,
                        'title' => $title,
                        'description' => $tour->description,
                        'auto_start' => (bool) $tour->auto_start,
                        'steps_count' => $tour->steps_count,
                        'steps' => $tour->steps->map(fn($s) => [
                            'id' => $s->id,
                            'element_selector' => $s->element_selector,
                            'target_text' => $s->target_text,
                            'trigger_selector' => $s->trigger_selector,
                            'title' => $s->title,
                            'description' => $s->description,
                            'video_url' => $s->video_url,
                            'card_size' => $s->card_size ?? 'md',
                            'is_action' => (bool) ($s->is_action || $s->card_size === 'action' || $s->step_type === 'action'),
                            'position' => $s->position ?? 'auto',
                            'sort_order' => $s->sort_order,
                        ])->toArray(),
                    ];
                })->toArray();
            } catch (\Throwable $e) {
                return [];
            }
        });
    }

    /**
     * Get cached progress map for a specific user to avoid DB queries on page views.
     * Returns: [ tour_id => ['completed' => bool, 'dismissed' => bool] ]
     */
    public static function getUserProgressMap(mixed $user): array
    {
        if (!$user) {
            return [];
        }

        $userType = is_object($user) && method_exists($user, 'getMorphClass')
            ? $user->getMorphClass()
            : (config('auth.providers.users.model') ?? 'App\Models\User');

        $userId = is_object($user) && method_exists($user, 'getKey')
            ? $user->getKey()
            : $user;

        if (!$userId) {
            return [];
        }

        $prefix = config('onboarding-tour.cache_prefix', 'onboarding_tour:');
        $cacheKey = "{$prefix}user_status:{$userType}:{$userId}";
        $ttl = config('onboarding-tour.cache_ttl', 86400);

        return self::store()->remember($cacheKey, $ttl, function () use ($userType, $userId) {
            try {
                $records = OnboardingTourUser::where('user_type', $userType)
                    ->where('user_id', $userId)
                    ->get();

                $map = [];
                foreach ($records as $r) {
                    $map[$r->tour_id] = [
                        'completed' => !is_null($r->completed_at),
                        'dismissed' => !is_null($r->dismissed_at),
                    ];
                }
                return $map;
            } catch (\Throwable $e) {
                return [];
            }
        });
    }

    /**
     * Record user progress in DB & update user cache map instantly.
     */
    public static function recordUserProgress(int $tourId, string $action, mixed $user): bool
    {
        if (!$user) {
            return false;
        }

        $userType = is_object($user) && method_exists($user, 'getMorphClass')
            ? $user->getMorphClass()
            : (config('auth.providers.users.model') ?? 'App\Models\User');

        $userId = is_object($user) && method_exists($user, 'getKey')
            ? $user->getKey()
            : $user;

        if (!$userId) {
            return false;
        }

        $timestamp = now();
        $record = OnboardingTourUser::firstOrNew([
            'user_type' => $userType,
            'user_id'   => $userId,
            'tour_id'   => $tourId,
        ]);

        if ($action === 'dismiss') {
            $record->dismissed_at = $timestamp;
        } else {
            $record->completed_at = $timestamp;
        }
        $record->save();

        // Update user status cache map instantly
        $prefix = config('onboarding-tour.cache_prefix', 'onboarding_tour:');
        $cacheKey = "{$prefix}user_status:{$userType}:{$userId}";
        $map = self::getUserProgressMap($user);
        $map[$tourId] = [
            'completed' => !is_null($record->completed_at),
            'dismissed' => !is_null($record->dismissed_at),
        ];
        self::store()->put($cacheKey, $map, config('onboarding-tour.cache_ttl', 86400));

        return true;
    }

    /**
     * Get tour structure and effective theme for current route and user progress.
     */
    public static function getTourForRoute(string $routeName, mixed $user = null): ?array
    {
        if (!config('onboarding-tour.enabled', true)) {
            return null;
        }

        $ttl = config('onboarding-tour.cache_ttl', 86400);
        $prefix = config('onboarding-tour.cache_prefix', 'onboarding_tour:');
        $globalTheme = self::getGlobalTheme();

        $exactKey = "{$prefix}route:{$routeName}";
        $store = self::store();

        if ($store->has($exactKey)) {
            $tourData = $store->get($exactKey);
        } else {
            $tour = OnboardingTour::where('route_name', $routeName)
                ->where('is_active', true)
                ->with(['steps' => fn($q) => $q->orderBy('sort_order', 'asc')])
                ->first();

            if (!$tour) {
                $normalized = self::normalizeRoutePattern($routeName);
                if ($normalized !== $routeName) {
                    $tour = OnboardingTour::where('route_name', $normalized)
                        ->where('is_active', true)
                        ->with(['steps' => fn($q) => $q->orderBy('sort_order', 'asc')])
                        ->first();
                }
            }

            if (!$tour) {
                $activeTours = OnboardingTour::where('is_active', true)
                    ->where('route_name', '!=', self::GLOBAL_THEME_ROUTE)
                    ->with(['steps' => fn($q) => $q->orderBy('sort_order', 'asc')])
                    ->get();

                $cleanRoute = ltrim($routeName, '/');
                $normalizedRoute = ltrim(self::normalizeRoutePattern($routeName), '/');

                foreach ($activeTours as $t) {
                    $cleanPattern = ltrim($t->route_name, '/');
                    $normalizedPattern = self::normalizeRoutePattern($cleanPattern);

                    if (\Illuminate\Support\Str::is($cleanPattern, $cleanRoute) ||
                        \Illuminate\Support\Str::is($normalizedPattern, $cleanRoute) ||
                        \Illuminate\Support\Str::is($cleanPattern, $normalizedRoute) ||
                        \Illuminate\Support\Str::is($normalizedPattern, $normalizedRoute)) {
                        $tour = $t;
                        break;
                    }
                }
            }

            if (!$tour) {
                return null;
            }

            $canonicalKey = "{$prefix}route:{$tour->route_name}";
            $tourData = $store->remember($canonicalKey, $ttl, function () use ($tour, $globalTheme) {
                $tourThemeSettings = $tour->theme_settings ?? [];
                $useCustom = isset($tourThemeSettings['use_custom_theme']) ? (bool) $tourThemeSettings['use_custom_theme'] : false;

                $effectiveTheme = $useCustom
                    ? array_merge($globalTheme, $tourThemeSettings, ['use_custom_theme' => true])
                    : array_merge($globalTheme, ['use_custom_theme' => false]);

                return [
                    'id' => $tour->id,
                    'route_name' => self::normalizeRoutePattern($tour->route_name),
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
                        'trigger_selector' => $s->trigger_selector,
                        'title' => $s->title,
                        'description' => $s->description,
                        'video_url' => $s->video_url,
                        'card_size' => $s->card_size ?? 'md',
                        'position' => $s->position,
                        'sort_order' => $s->sort_order,
                    ])->toArray(),
                ];
            });

            if ($routeName !== $tour->route_name) {
                $store->put($exactKey, $tourData, $ttl);
            }
        }

        if (!$tourData) {
            return null;
        }

        // Resolve translations in one pass
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

        // Check user progress from Redis/Cache user map (ZERO SQL queries!)
        $completed = $dismissed = false;
        if ($user) {
            $userProgressMap = self::getUserProgressMap($user);
            $tourId = $tourData['id'];
            if (isset($userProgressMap[$tourId])) {
                $completed = $userProgressMap[$tourId]['completed'] ?? false;
                $dismissed = $userProgressMap[$tourId]['dismissed'] ?? false;
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
        $explicit = config('onboarding-tour.locales');
        if (is_array($explicit) && !empty($explicit)) {
            return $explicit;
        }

        $discovered = (array) (config('app.locales') ?? config('app.available_locales') ?? config('app.supported_locales') ?? []);

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

        $discovered[] = app()->getLocale();
        if ($fb = config('app.fallback_locale')) $discovered[] = $fb;

        $result = array_values(array_unique(array_filter($discovered)));
        return !empty($result) ? $result : ['it', 'en'];
    }

    public static function normalizeRoutePattern(string $routeName): string
    {
        $pattern = preg_replace('/^https?:\/\/[^\/]+/', '', $routeName);
        $pattern = preg_replace('/\{[^}]+\}/', '*', $pattern);
        $pattern = preg_replace('/(?<=\/)\d+(?=\/|$)/', '*', $pattern);
        $pattern = preg_replace('/(?<=\/)[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}(?=\/|$)/', '*', $pattern);
        return $pattern;
    }

    /**
     * Flush all onboarding tour caches across Redis/Cache store.
     */
    public static function flushAllCaches(): void
    {
        $prefix = config('onboarding-tour.cache_prefix', 'onboarding_tour:');
        $store = self::store();

        if (config('onboarding-tour.use_cache_tags', true) && method_exists($store, 'flush')) {
            try {
                $store->flush();
                return;
            } catch (\Throwable $e) {}
        }

        // Fallback key-by-key flushing
        $store->forget("{$prefix}tours_list");
        $store->forget("{$prefix}global_theme");

        try {
            OnboardingTour::select('route_name')->get()
                ->each(function ($tour) use ($prefix, $store) {
                    $store->forget("{$prefix}route:{$tour->route_name}");
                    $normalized = self::normalizeRoutePattern($tour->route_name);
                    if ($normalized !== $tour->route_name) {
                        $store->forget("{$prefix}route:{$normalized}");
                    }
                });
        } catch (\Throwable $e) {}
    }

    public static function flushCacheForRoute(string $routeName): void
    {
        self::flushAllCaches();
    }
}
