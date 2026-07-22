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
    | Cache Settings (Redis / Default Cache)
    |--------------------------------------------------------------------------
    */
    'cache_ttl' => 86400, // 24 hours
    'cache_prefix' => 'onboarding_tour:',
];
