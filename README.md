# Laravel Onboarding Tour

[![Latest Version on Packagist](https://img.shields.io/packagist/v/taoshan98/laravel-onboarding-tour.svg?style=flat-square)](https://packagist.org/packages/taoshan98/laravel-onboarding-tour)
[![Total Downloads](https://img.shields.io/packagist/dt/taoshan98/laravel-onboarding-tour.svg?style=flat-square)](https://packagist.org/packages/taoshan98/laravel-onboarding-tour)
[![License](https://img.shields.io/packagist/l/taoshan98/laravel-onboarding-tour.svg?style=flat-square)](LICENSE)

An interactive, visual onboarding tour package for Laravel applications. Features an in-browser live visual builder, customizable popover cards, expandable media lightboxes, Redis/Cache optimization, strict security URL sanitization, and Livewire v3 SPA support.

---

## 🚀 Key Features & Highlights

- **Visual Inspector & Live Tour Builder**: Point and click on any DOM element on your page to create, edit, and reorder guided onboarding steps.
- **Standalone Light & Dark Mode System**: Automatically aligns with your host application's theme (`.dark`, `[data-theme="dark"]`), independent of OS preferences.
- **Admin UI Color Isolation**: The builder toolbar, side drawer, inspector selector outline, and modals use a fixed, minimal primary blue (`#2563eb`), ensuring theme customization never bleeds into the admin interface.
- **Instant Live Single-Step Preview**: Click the Eye (`Test`) icon on any step to instantly preview it on the real page. Automatically closes the drawer and includes a 1-click **`[ ✏️ Back to Editor ]`** button.
- **Navigation Interception in Builder Mode**: Capture-phase event interception (`mousedown`, `pointerdown`, `click`) prevents links, buttons, and form submissions from navigating away while configuring steps.
- **Outside-Click Drawer Dismissal**: Clicking anywhere outside the configuration drawer smoothly closes the drawer without selecting elements or triggering actions.
- **Ultra-Compact Step List Cards**: Streamlined 36-40px step cards with inline SVG media badges, fitting 2x more steps on screen without scrolling.
- **4 Distinct Backdrop Color Presets**:
  - 🌌 **Midnight Slate** (`#0f172a`)
  - 🔮 **Deep Indigo** (`#1e1b4b`)
  - 🌲 **Emerald Night** (`#022c22`)
  - 🌪️ **Soft Charcoal** (`#334155`)
- **Strict Security & URL Sanitization**: Automated HTTPS enforcement, regex validation, dangerous scheme filtering (`javascript:`, `data:`), and `rel="noopener noreferrer"` protection.
- **Automatic Cache Invalidation**: `TourCacheService` automatically clears route tour caches whenever the Global Theme is updated.
- **Expandable Media Lightbox**: Full-screen modal viewing for images, GIFs, YouTube, Vimeo, and MP4 videos.
- **Livewire v3 SPA Support**: Seamlessly handles page swaps (`wire:navigate`) without losing event listeners or state.
- **Zero Third-Party JS/CSS Dependencies**: Built with 100% Vanilla JS and Vanilla CSS.

---

## 🛠️ Installation

Install the package via Composer:

```bash
composer require taoshan98/laravel-onboarding-tour
```

Run the database migrations:

```bash
php artisan migrate
```

Publish the configuration file and translations:

```bash
php artisan vendor:publish --tag="onboarding-tour-config"
php artisan vendor:publish --tag="onboarding-tour-lang"
```

---

## 💻 Blade Integration

Include the main `<x-onboarding-tour />` component in your layout file (e.g., `resources/views/layouts/app.blade.php`):

```blade
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name') }}</title>
</head>
<body class="font-sans antialiased">
    {{ $slot }}

    <!-- Onboarding Tour Engine Component -->
    <x-onboarding-tour />
</body>
</html>
```

### Trigger & Admin Builder Buttons

Place the trigger buttons anywhere in your navigation bar or header:

```blade
<!-- User Tour Trigger Button -->
<x-onboarding-tour-trigger />

<!-- Admin Visual Tour Builder Toggle Button (Visible to authorized users) -->
@can('manage-tours')
    <x-onboarding-tour-admin-toggle />
@endcan
```

---

## ⚙️ Configuration (`config/onboarding-tour.php`)

```php
return [
    /*
    |--------------------------------------------------------------------------
    | Package Enable / Disable
    |--------------------------------------------------------------------------
    */
    'enabled' => env('ONBOARDING_TOUR_ENABLED', true),

    /*
    |--------------------------------------------------------------------------
    | API Endpoint & Middleware
    |--------------------------------------------------------------------------
    */
    'route_prefix' => 'api/onboarding-tour',
    'middleware' => ['web', 'auth'],

    /*
    |--------------------------------------------------------------------------
    | Cache Settings
    |--------------------------------------------------------------------------
    */
    'cache_prefix' => 'onboarding_tour:',
    'cache_ttl' => 86400, // 24 hours

    /*
    |--------------------------------------------------------------------------
    | Global Theme Defaults
    |--------------------------------------------------------------------------
    */
    'theme' => [
        'use_custom_theme' => false,
        'card_style'       => 'auto',     // 'auto', 'glass', 'dark', 'light'
        'card_size'        => 'md',       // 'sm', 'md', 'lg', 'xl'
        'accent_color'     => '#2563eb',  // Default primary blue
        'highlight_style'  => 'minimal',  // 'minimal', 'ring', 'glow', 'dashed', 'none'
        'backdrop_hex'     => '#0f172a',  // Midnight Slate
        'backdrop_opacity' => 75,
        'backdrop_color'   => 'rgba(15, 23, 42, 0.75)',
    ],
];
```

---

## 📚 Technical Specifications & Architecture Docs

Detailed technical specifications for planned extensions are available in the `docs/` directory:

- ⌨️ **[Keyboard Navigation & Accessibility Spec](docs/FEATURE_KEYBOARD_ACCESSIBILITY.md)**: Specifications for hotkeys, ARIA focus trapping, and the interactive Shortcuts Palette Modal (`?`).
- 🌐 **[Host-Aligned Multi-Language Spec](docs/FEATURE_MULTILANGUAGE_CONTENT.md)**: Architecture for N Titles, N Descriptions, and N Media URLs per locale configured in your host application.

---

## 🔒 Security

If you discover any security-related issues, please email the maintainers directly or open a GitHub issue. All media URLs and links are sanitized against XSS, dangerous schemes (`javascript:`, `data:`), and tabnabbing attacks.

---

## 📄 License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
