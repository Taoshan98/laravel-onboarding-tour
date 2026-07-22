<?php

namespace Taoshan\LaravelOnboardingTour\Services;

use Illuminate\Support\Facades\Cache;
use Taoshan\LaravelOnboardingTour\Models\OnboardingTour;
use Taoshan\LaravelOnboardingTour\Models\OnboardingTourUser;

class TourCacheService
{
    public static function getGlobalTheme(): array
    {
        $defaultConfig = config('onboarding-tour.theme', [
            'use_custom_theme' => false,
            'card_style'       => 'auto',
            'card_size'        => 'md',
            'accent_color'     => '#2563eb',
            'card_radius'      => '20px',
            'highlight_style'  => 'minimal',
            'backdrop_hex'     => '#0f172a',
            'backdrop_opacity' => 75,
            'backdrop_color'   => 'rgba(15, 23, 42, 0.75)',
        ]);

        $prefix = config('onboarding-tour.cache_prefix', 'onboarding_tour:');
        $cacheKey = "{$prefix}global_theme";

        return Cache::rememberForever($cacheKey, function () use ($defaultConfig) {
            return $defaultConfig;
        });
    }

    public static function setGlobalTheme(array $themeData): array
    {
        $prefix = config('onboarding-tour.cache_prefix', 'onboarding_tour:');
        $cacheKey = "{$prefix}global_theme";

        $current = self::getGlobalTheme();
        $updated = array_merge($current, $themeData, ['use_custom_theme' => false]);

        Cache::forever($cacheKey, $updated);

        return $updated;
    }

    public static function getTourForRoute(string $routeName, ?int $userId = null): ?array
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

        // Check completion status for the current user
        $completed = false;
        $dismissed = false;

        if ($userId) {
            $record = OnboardingTourUser::where('user_id', $userId)
                ->where('tour_id', $tourData['id'])
                ->first();

            if ($record) {
                $completed = !is_null($record->completed_at);
                $dismissed = !is_null($record->dismissed_at);
            }
        }

        $tourData['user_completed'] = $completed;
        $tourData['user_dismissed'] = $dismissed;
        $tourData['should_auto_start'] = $tourData['auto_start'] && !$completed && !$dismissed;
        $tourData['global_theme'] = $globalTheme;

        return $tourData;
    }

    public static function flushCacheForRoute(string $routeName): void
    {
        $prefix = config('onboarding-tour.cache_prefix', 'onboarding_tour:');
        Cache::forget("{$prefix}route:{$routeName}");
    }
}
