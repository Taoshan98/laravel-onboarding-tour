<?php

namespace Taoshan\LaravelOnboardingTour\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Taoshan\LaravelOnboardingTour\Models\OnboardingTour;
use Taoshan\LaravelOnboardingTour\Models\OnboardingTourStep;
use Taoshan\LaravelOnboardingTour\Models\OnboardingTourUser;
use Taoshan\LaravelOnboardingTour\Services\TourCacheService;

class TourApiController extends Controller
{
    public function getConfig(Request $request): JsonResponse
    {
        $routeName = $request->query('route_name');
        $user = Auth::user();

        $locales = TourCacheService::discoverHostLocales();
        $currentLocale = app()->getLocale();

        if (!$routeName) {
            return response()->json([
                'tour' => null,
                'global_theme' => TourCacheService::getGlobalTheme(),
                'translations' => trans('onboarding-tour::messages'),
                'locales' => array_values($locales),
                'default_locale' => config('app.locale', 'en'),
                'current_locale' => $currentLocale,
            ]);
        }

        $tour = TourCacheService::getTourForRoute($routeName, $user);

        return response()->json([
            'tour' => $tour,
            'global_theme' => TourCacheService::getGlobalTheme(),
            'translations' => trans('onboarding-tour::messages'),
            'locales' => array_values($locales),
            'default_locale' => config('app.locale', 'en'),
            'current_locale' => $currentLocale,
        ]);
    }

    public function listTours(Request $request): JsonResponse
    {
        $tours = TourCacheService::getCachedToursList();

        return response()->json([
            'tours' => $tours,
        ]);
    }

    public function saveGlobalTheme(Request $request): JsonResponse
    {
        $data = $request->validate([
            'theme_settings' => 'required|array',
            'theme_settings.card_style' => 'nullable|string',
            'theme_settings.card_size' => 'nullable|string',
            'theme_settings.accent_color' => 'nullable|string',
            'theme_settings.highlight_style' => 'nullable|string',
            'theme_settings.backdrop_hex' => 'nullable|string',
            'theme_settings.backdrop_opacity' => 'nullable|integer',
            'theme_settings.backdrop_color' => 'nullable|string',
        ]);

        $updatedGlobal = TourCacheService::setGlobalTheme($data['theme_settings']);

        return response()->json([
            'success' => true,
            'message' => trans('onboarding-tour::messages.global_theme_saved'),
            'global_theme' => $updatedGlobal,
        ]);
    }

    public function saveTour(Request $request): JsonResponse
    {
        $user = Auth::user();

        $data = $request->validate([
            'route_name' => 'required|string',
            'is_wildcard' => 'nullable|boolean',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'auto_start' => 'boolean',
            'highlight_theme' => 'nullable|string',
            'theme_settings' => 'nullable|array',
            'steps' => 'required|array',
            'steps.*.element_selector' => 'required|string',
            'steps.*.target_text' => 'nullable|string',
            'steps.*.trigger_selector' => 'nullable|string',
            'steps.*.title' => 'nullable',
            'steps.*.description' => 'nullable',
            'steps.*.video_url' => 'nullable',
            'steps.*.card_size' => 'nullable|string',
            'steps.*.is_action' => 'nullable|boolean',
            'steps.*.position' => 'nullable|string',
            'steps.*.sort_order' => 'nullable|integer',
        ]);

        $isWildcard = $data['is_wildcard'] ?? true;
        $routeName = $isWildcard
            ? TourCacheService::normalizeRoutePattern($data['route_name'])
            : $data['route_name'];

        $tour = OnboardingTour::updateOrCreate(
            ['route_name' => $routeName],
            [
                'title' => $data['title'],
                'description' => $data['description'] ?? null,
                'auto_start' => $data['auto_start'] ?? true,
                'highlight_theme' => $data['highlight_theme'] ?? 'minimal',
                'theme_settings' => $data['theme_settings'] ?? [],
                'is_active' => true,
            ]
        );

        // Synchronize steps
        $existingStepIds = [];
        foreach ($data['steps'] as $idx => $sData) {
            $isAction = isset($sData['is_action']) ? (bool) $sData['is_action'] : (($sData['card_size'] ?? '') === 'action');
            $title = !empty($sData['title']) ? $sData['title'] : ($isAction ? ['it' => 'Navigazione Automatica', 'en' => 'Auto Action'] : []);
            $description = !empty($sData['description']) ? $sData['description'] : [];

            $step = OnboardingTourStep::updateOrCreate(
                [
                    'tour_id' => $tour->id,
                    'sort_order' => $sData['sort_order'] ?? ($idx + 1),
                ],
                [
                    'element_selector' => $sData['element_selector'],
                    'target_text' => $sData['target_text'] ?? null,
                    'trigger_selector' => $sData['trigger_selector'] ?? null,
                    'title' => $title,
                    'description' => $description,
                    'video_url' => $this->sanitizeUrl($sData['video_url'] ?? null),
                    'card_size' => $sData['card_size'] ?? 'md',
                    'is_action' => $isAction,
                    'position' => $sData['position'] ?? 'auto',
                ]
            );
            $existingStepIds[] = $step->id;
        }

        // Delete steps no longer in payload
        OnboardingTourStep::where('tour_id', $tour->id)
            ->whereNotIn('id', $existingStepIds)
            ->delete();

        // Flush Redis cache for both raw and normalized route
        TourCacheService::flushCacheForRoute($data['route_name']);
        if ($routeName !== $data['route_name']) {
            TourCacheService::flushCacheForRoute($routeName);
        }

        return response()->json([
            'success' => true,
            'message' => trans('onboarding-tour::messages.tour_saved_success'),
            'tour' => TourCacheService::getTourForRoute($routeName, $user),
        ]);
    }

    public function completeTour(Request $request): JsonResponse
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => trans('onboarding-tour::messages.unauthenticated')], 401);
        }

        $data = $request->validate([
            'tour_id' => 'required|integer',
            'action' => 'required|string|in:complete,dismiss',
        ]);

        TourCacheService::recordUserProgress($data['tour_id'], $data['action'], $user);

        return response()->json(['success' => true]);
    }

    public function deleteTour(Request $request): JsonResponse
    {
        $routeName = $request->input('route_name');
        if ($routeName) {
            OnboardingTour::where('route_name', $routeName)->delete();
            TourCacheService::flushCacheForRoute($routeName);
        }

        return response()->json(['success' => true]);
    }

    private function sanitizeUrl(array|string|null $url): array|string|null
    {
        if (is_array($url)) {
            return array_map(fn($u) => is_string($u) ? $this->sanitizeUrl($u) : null, $url);
        }

        if (!is_string($url) || !($trimmed = trim($url))) return null;
        if (preg_match('/^https:\/\//i', $trimmed) || str_starts_with($trimmed, '/') || preg_match('/^data:image\//i', $trimmed)) return $trimmed;
        if (preg_match('/^http:\/\//i', $trimmed)) return preg_replace('/^http:\/\//i', 'https://', $trimmed);
        return null;
    }
}
