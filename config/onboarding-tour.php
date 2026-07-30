<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Package Enable Switch
    |--------------------------------------------------------------------------
    */
    'enabled' => env('ONBOARDING_TOUR_ENABLED', true),

    /*
    |--------------------------------------------------------------------------
    | Route Prefix & Middleware for Admin API
    |--------------------------------------------------------------------------
    */
    'route_prefix' => 'api/onboarding-tour',
    'middleware' => ['web', 'auth'],

    /*
    |--------------------------------------------------------------------------
    | Supported Application Locales
    |--------------------------------------------------------------------------
    | List of supported locales for step title, description, and media URLs.
    | Set to null to automatically discover from host application configuration
    | (config('app.locales'), config('app.available_locales'), etc.).
    */
    'locales' => null,

    /*
    |--------------------------------------------------------------------------
    | Cache Settings (Redis / Dedicated Cache Store)
    |--------------------------------------------------------------------------
    | Specify a dedicated cache store (e.g. 'redis', 'memcached') or leave null
    | to use the host application's default cache store.
    | Enable 'use_cache_tags' to leverage Redis Cache Tags for instant invalidation.
    |
    */
    'cache_store' => env('ONBOARDING_TOUR_CACHE_STORE', null),
    'use_cache_tags' => env('ONBOARDING_TOUR_CACHE_TAGS', true),
    'cache_ttl' => env('ONBOARDING_TOUR_CACHE_TTL', 86400), // 24 hours
    'cache_prefix' => env('ONBOARDING_TOUR_CACHE_PREFIX', 'onboarding_tour:'),
];
