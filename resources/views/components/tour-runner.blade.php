@php
    $routeName = \Illuminate\Support\Facades\Route::currentRouteName() ?? request()->path();
    $user = auth()->user();
    $userId = $user?->id;
    $tourData = \Taoshan\LaravelOnboardingTour\Services\TourCacheService::getTourForRoute($routeName, $userId);
    $globalTheme = \Taoshan\LaravelOnboardingTour\Services\TourCacheService::getGlobalTheme();

    $configJson = json_encode([
        'route_name' => $routeName,
        'tour' => $tourData,
        'global_theme' => $globalTheme,
        'is_admin' => true,
        'translations' => trans('onboarding-tour::messages'),
    ]);
@endphp

@if(config('onboarding-tour.enabled', true))
    <!-- Inline Header Onboarding Tour Trigger Widget -->
    <div id="onboarding-tour-widget" class="flex items-center gap-2 select-none">
        @if($tourData && !empty($tourData['steps']))
            <x-onboarding-tour-trigger />
        @endif

        <x-onboarding-tour-admin-toggle />
    </div>

    <!-- Inject CSS & JS -->
    <style>
        {!! \Taoshan\LaravelOnboardingTour\OnboardingTourServiceProvider::getAssetContent('css/tour-styles.css') !!}
    </style>

    <script>
        {!! \Taoshan\LaravelOnboardingTour\OnboardingTourServiceProvider::getAssetContent('js/tour-engine.js') !!}
        document.addEventListener('DOMContentLoaded', function () {
            if (window.LaravelOnboardingTour) {
                window.LaravelOnboardingTour.init({!! $configJson !!});
            }
        });
    </script>
@endif
