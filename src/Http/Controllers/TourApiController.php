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
        $userId = $user?->id;

        if (!$routeName) {
            return response()->json([
                'tour' => null,
                'global_theme' => TourCacheService::getGlobalTheme(),
                'translations' => trans('onboarding-tour::messages'),
            ]);
        }

        $tour = TourCacheService::getTourForRoute($routeName, $userId);

        return response()->json([
            'tour' => $tour,
            'global_theme' => TourCacheService::getGlobalTheme(),
            'translations' => trans('onboarding-tour::messages'),
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
            'message' => 'Tema globale dell\'applicazione aggiornato con successo!',
            'global_theme' => $updatedGlobal,
        ]);
    }

    public function saveTour(Request $request): JsonResponse
    {
        $user = Auth::user();

        $data = $request->validate([
            'route_name' => 'required|string',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'auto_start' => 'boolean',
            'highlight_theme' => 'nullable|string',
            'theme_settings' => 'nullable|array',
            'steps' => 'required|array',
            'steps.*.element_selector' => 'required|string',
            'steps.*.target_text' => 'nullable|string',
            'steps.*.title' => 'required|string|max:255',
            'steps.*.description' => 'required|string',
            'steps.*.video_url' => 'nullable|string',
            'steps.*.card_size' => 'nullable|string',
            'steps.*.position' => 'nullable|string',
            'steps.*.sort_order' => 'nullable|integer',
        ]);

        $tour = OnboardingTour::updateOrCreate(
            ['route_name' => $data['route_name']],
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
            $step = OnboardingTourStep::updateOrCreate(
                [
                    'tour_id' => $tour->id,
                    'sort_order' => $sData['sort_order'] ?? ($idx + 1),
                ],
                [
                    'element_selector' => $sData['element_selector'],
                    'target_text' => $sData['target_text'] ?? null,
                    'title' => $sData['title'],
                    'description' => $sData['description'],
                    'video_url' => $sData['video_url'] ?? null,
                    'card_size' => $sData['card_size'] ?? 'md',
                    'position' => $sData['position'] ?? 'auto',
                ]
            );
            $existingStepIds[] = $step->id;
        }

        // Delete steps no longer in payload
        OnboardingTourStep::where('tour_id', $tour->id)
            ->whereNotIn('id', $existingStepIds)
            ->delete();

        // Flush Redis cache for this route
        TourCacheService::flushCacheForRoute($data['route_name']);

        return response()->json([
            'success' => true,
            'message' => 'Tour salvato con successo',
            'tour' => TourCacheService::getTourForRoute($data['route_name'], $user?->id),
        ]);
    }

    public function completeTour(Request $request): JsonResponse
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Utente non autenticato'], 401);
        }

        $data = $request->validate([
            'tour_id' => 'required|integer',
            'action' => 'required|string|in:complete,dismiss',
        ]);

        $record = OnboardingTourUser::firstOrNew([
            'user_id' => $user->id,
            'tour_id' => $data['tour_id'],
        ]);

        if ($data['action'] === 'dismiss') {
            $record->dismissed_at = now();
        } else {
            $record->completed_at = now();
        }
        $record->save();

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
}
