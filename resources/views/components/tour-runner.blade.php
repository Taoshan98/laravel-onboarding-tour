@php
    $routeName = \Illuminate\Support\Facades\Route::currentRouteName() ?? request()->path();
    $user = auth()->user();
    $userId = $user?->id;
    $tourData = \Tecnovat\LaravelOnboardingTour\Services\TourCacheService::getTourForRoute($routeName, $userId);
    $globalTheme = \Tecnovat\LaravelOnboardingTour\Services\TourCacheService::getGlobalTheme();

    $isAdmin = false;
    if ($user) {
        $isAdmin = (isset($user->is_admin) && $user->is_admin)
            || (isset($user->role) && in_array($user->role, ['admin', 'super-admin']))
            || (method_exists($user, 'hasRole') && $user->hasRole('admin'))
            || true; // Enabled for dev
    }

    $configJson = json_encode([
        'route_name' => $routeName,
        'tour' => $tourData,
        'global_theme' => $globalTheme,
        'is_admin' => $isAdmin,
    ]);
@endphp

@if(config('onboarding-tour.enabled', true))
    <!-- Inline Header Onboarding Tour Trigger Widget -->
    <div id="onboarding-tour-widget" class="flex items-center gap-2 select-none">
        @if($tourData && !empty($tourData['steps']))
            <button id="tour-start-btn"
                    title="{{ __('Avvia Tour Guidato') }}"
                    class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 font-bold text-xs border border-blue-500/20 transition-all duration-200 hover:scale-105 active:scale-95">
                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ __('Avvia il Tour') }}</span>
            </button>
        @endif

        @if($isAdmin)
            <button id="tour-admin-toggle-btn"
                    title="{{ __('Modalità Admin: Modifica Tour') }}"
                    class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold border border-zinc-200 dark:border-zinc-700/80 transition-all hover:scale-105">
                <svg class="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>{{ __('Builder Tour') }}</span>
            </button>
        @endif
    </div>

    <!-- Inject CSS & JS -->
    <style>
        {!! file_get_contents(base_path('packages/tecnovat/laravel-onboarding-tour/resources/css/tour-styles.css')) !!}
    </style>

    <script>
        {!! file_get_contents(base_path('packages/tecnovat/laravel-onboarding-tour/resources/js/tour-engine.js')) !!}
        document.addEventListener('DOMContentLoaded', function () {
            if (window.LaravelOnboardingTour) {
                window.LaravelOnboardingTour.init({!! $configJson !!});
            }
        });
    </script>
@endif
