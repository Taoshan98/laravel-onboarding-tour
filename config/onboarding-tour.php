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
    | Cache Settings (Redis / Default Cache)
    |--------------------------------------------------------------------------
    */
    'cache_ttl' => 86400, // 24 hours
    'cache_prefix' => 'onboarding_tour:',

    /*
    |--------------------------------------------------------------------------
    | Application Global Default Theme Settings
    |--------------------------------------------------------------------------
    | This theme applies by default to all tours across all views unless a tour
    | explicitly enables view-dedicated customization ("use_custom_theme" => true).
    */
    'theme' => [
        'use_custom_theme' => false,
        'card_style'       => 'auto',           // 'auto', 'glass', 'dark', 'light'
        'accent_color'     => '#2563eb',        // Primary button & progress badge color
        'card_radius'      => '20px',           // Card border radius
        'highlight_style'  => 'minimal',        // 'minimal', 'ring', 'glow', 'dashed', 'none'
        'backdrop_hex'     => '#0f172a',        // Base hex color for backdrop
        'backdrop_opacity' => 75,               // Backdrop opacity percentage (20 to 95)
        'backdrop_color'   => 'rgba(15, 23, 42, 0.75)', // Dimmed overlay background
    ],
];
