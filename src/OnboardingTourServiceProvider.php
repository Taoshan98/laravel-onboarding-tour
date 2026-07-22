<?php

namespace Taoshan\LaravelOnboardingTour;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Taoshan\LaravelOnboardingTour\Http\Controllers\TourApiController;

class OnboardingTourServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(
            __DIR__ . '/../config/onboarding-tour.php',
            'onboarding-tour'
        );
    }

    public function boot(): void
    {
        // Load migrations
        $this->loadMigrationsFrom(__DIR__ . '/../database/migrations');

        // Load views
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'onboarding-tour');

        // Load translations
        $this->loadTranslationsFrom(__DIR__ . '/../resources/lang', 'onboarding-tour');

        // Register Blade component
        Blade::component('onboarding-tour::components.tour-runner', 'onboarding-tour');

        // Register API Routes
        $this->registerRoutes();

        // Publishing assets & config & lang
        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__ . '/../config/onboarding-tour.php' => config_path('onboarding-tour.php'),
            ], 'onboarding-tour-config');

            $this->publishes([
                __DIR__ . '/../resources/views' => resource_path('views/vendor/onboarding-tour'),
            ], 'onboarding-tour-views');

            $this->publishes([
                __DIR__ . '/../resources/lang' => $this->app->langPath('vendor/onboarding-tour'),
            ], 'onboarding-tour-lang');

            $this->publishes([
                __DIR__ . '/../resources/js' => public_path('vendor/onboarding-tour/js'),
                __DIR__ . '/../resources/css' => public_path('vendor/onboarding-tour/css'),
            ], 'onboarding-tour-assets');
        }
    }

    protected function registerRoutes(): void
    {
        $prefix = config('onboarding-tour.route_prefix', 'api/onboarding-tour');
        $middleware = config('onboarding-tour.middleware', ['web']);

        Route::group([
            'prefix' => $prefix,
            'middleware' => $middleware,
        ], function () {
            Route::get('/config', [TourApiController::class, 'getConfig'])->name('onboarding-tour.config');
            Route::post('/save', [TourApiController::class, 'saveTour'])->name('onboarding-tour.save');
            Route::post('/save-global-theme', [TourApiController::class, 'saveGlobalTheme'])->name('onboarding-tour.save-global-theme');
            Route::post('/complete', [TourApiController::class, 'completeTour'])->name('onboarding-tour.complete');
            Route::post('/delete', [TourApiController::class, 'deleteTour'])->name('onboarding-tour.delete');
        });
    }

    public static function getPackagePath(string $path = ''): string
    {
        return dirname(__DIR__) . ($path ? '/' . ltrim($path, '/') : '');
    }

    public static function getAssetContent(string $relativePath): string
    {
        $publishedPath = public_path('vendor/onboarding-tour/' . $relativePath);
        if (file_exists($publishedPath)) {
            return file_get_contents($publishedPath) ?: '';
        }

        $packagePath = self::getPackagePath('resources/' . $relativePath);
        if (file_exists($packagePath)) {
            return file_get_contents($packagePath) ?: '';
        }

        return '';
    }
}
