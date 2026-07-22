@php
    $routeName = \Illuminate\Support\Facades\Route::currentRouteName() ?? request()->path();
    $user = auth()->user();
    $tourData = \Taoshan\LaravelOnboardingTour\Services\TourCacheService::getTourForRoute($routeName, $user);
    $globalTheme = \Taoshan\LaravelOnboardingTour\Services\TourCacheService::getGlobalTheme();

    $locales = \Taoshan\LaravelOnboardingTour\Services\TourCacheService::discoverHostLocales();

    $configJson = json_encode([
        'route_name' => $routeName,
        'tour' => $tourData,
        'global_theme' => $globalTheme,
        'translations' => trans('onboarding-tour::messages'),
        'locales' => $locales,
        'default_locale' => config('app.locale', 'en'),
        'current_locale' => app()->getLocale(),
    ]);
@endphp

@if(config('onboarding-tour.enabled', true))
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
