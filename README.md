# Laravel Onboarding Tour

[![Latest Version on Packagist](https://img.shields.io/packagist/v/taoshan98/laravel-onboarding-tour.svg?style=flat-square)](https://packagist.org/packages/taoshan98/laravel-onboarding-tour)
[![Total Downloads](https://img.shields.io/packagist/dt/taoshan98/laravel-onboarding-tour.svg?style=flat-square)](https://packagist.org/packages/taoshan98/laravel-onboarding-tour)
[![License](https://img.shields.io/packagist/l/taoshan98/laravel-onboarding-tour.svg?style=flat-square)](LICENSE)

An interactive, visual onboarding tour package for Laravel applications. Features an in-browser live visual builder, customizable popover cards, expandable media lightboxes, Redis/Cache optimization, and Livewire v3 SPA support.

---

## 🚀 Key Features

- **Visual Inspector & Tour Builder**: Point and click on any DOM element to create guided onboarding steps.
- **Sticky Live Theme Preview**: Customize colors, card sizes, backdrop colors, opacities, and spotlight styles in real-time.
- **Global & Per-View Theme Scope**: Configure a global application theme or customize themes per view route.
- **Expandable Media Lightbox**: Support for images, GIFs, YouTube, Vimeo, and MP4 videos with full-screen lightbox viewing.
- **Livewire v3 SPA Support**: Seamlessly handles page swaps (`wire:navigate`) without losing event listeners or state.
- **High Performance & Cache Ready**: Instant tour fetching with Laravel Cache / Redis integration.
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

Optionally publish the configuration file or translations:

```bash
php artisan vendor:publish --tag="onboarding-tour-config"
php artisan vendor:publish --tag="onboarding-tour-lang"
```

---

## 💻 Usage

Include the `<x-onboarding-tour />` component in your main layout file (e.g. `resources/views/layouts/app.blade.php`):

```blade
<!DOCTYPE html>
<html>
<head>
    <!-- ... -->
</head>
<body>
    {{ $slot }}

    <!-- Onboarding Tour Component -->
    <x-onboarding-tour />
</body>
</html>
```

### Adding Builder & Trigger Buttons

Place trigger buttons anywhere in your navigation bar or header:

```blade
<!-- Start Tour Button -->
<x-onboarding-tour-trigger />

<!-- Admin Visual Tour Builder Toggle Button -->
<x-onboarding-tour-admin-toggle />
```

---

## ⚙️ Configuration

`config/onboarding-tour.php`:

```php
return [
    'enabled' => env('ONBOARDING_TOUR_ENABLED', true),
    'route_prefix' => 'api/onboarding-tour',
    'middleware' => ['web'],
    'cache_prefix' => 'onboarding_tour:',
    'cache_ttl' => 86400,
    
    'theme' => [
        'use_custom_theme' => false,
        'card_style'       => 'auto', // 'auto', 'glass', 'dark', 'light'
        'card_size'        => 'md',   // 'sm', 'md', 'lg', 'xl'
        'accent_color'     => '#2563eb',
        'highlight_style'  => 'minimal',
        'backdrop_hex'     => '#0f172a',
        'backdrop_opacity' => 75,
    ],
];
```

---

## 📄 License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
