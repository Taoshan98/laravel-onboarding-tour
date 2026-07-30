# Laravel Onboarding Tour

[![Latest Version on Packagist](https://img.shields.io/packagist/v/taoshan98/laravel-onboarding-tour.svg?style=flat-square)](https://packagist.org/packages/taoshan98/laravel-onboarding-tour)
[![Total Downloads](https://img.shields.io/packagist/dt/taoshan98/laravel-onboarding-tour.svg?style=flat-square)](https://packagist.org/packages/taoshan98/laravel-onboarding-tour)
[![License](https://img.shields.io/packagist/l/taoshan98/laravel-onboarding-tour.svg?style=flat-square)](LICENSE)

An interactive onboarding tour package for Laravel. Build guided tours visually in the browser — no code required. Features a live visual builder, multi-language support, theme customization, auto-navigation action steps, interactive UI navigation mode, wildcard route matching, keyboard navigation, media lightbox, and Livewire v3 SPA compatibility.

**Zero JS/CSS dependencies.** Works on any Laravel app with or without Tailwind, Bootstrap, or Flux.

---

## Features

- **Visual Builder** — Click any element on your page to create tour steps. Drag & drop to reorder. Live preview.
- **Auto Navigation Steps** — Create silent action steps that automatically click tabs, steppers, or buttons to navigate interfaces without showing cards.
- **Interactive UI Mode** — Temporarily suspend inspector DOM selection to click sub-tabs, dropdowns, and navigate UI while staying inside the builder.
- **Wildcard Route Matching** — Match dynamic routes easily (e.g. `users/*/edit`) with a one-click toggle ("Applica a pagine simili").
- **Form Submission Guard** — Advanced programmatic click protection (`safeClick`) that intercepts native `form.submit()` and event dispatches to prevent unintended page reloads during tour playback.
- **Async UI Resilience** — Extended polling resilience (up to 1.5s) for slow Livewire v3, Alpine.js, or AJAX network requests to render DOM nodes.
- **Multi-Language (i18n)** — Auto-discovers host locales from `lang/` directories and config. Per-step titles, descriptions, and media URLs for each language.
- **Theme Customization** — Global and per-tour themes. Card styles (auto, glass, dark, light), accent colors, backdrop presets, highlight styles, live preview.
- **Clean Enterprise Aesthetics** — 100% SVG vector icon set, zero emojis, compact modal layout with accordion for advanced options.
- **Keyboard Shortcuts** — Full hotkey navigation with an interactive shortcuts palette (`?`).
- **Media Lightbox** — Expandable full-screen viewer for images, GIFs, YouTube, Vimeo, and MP4 videos.
- **Dark Mode** — Automatically follows your host app's theme (`.dark` class or `[data-theme="dark"]`).
- **Livewire v3** — Seamless re-init on `wire:navigate` page swaps.
- **Cache Optimized** — Tour data cached with configurable TTL. Auto-invalidation on theme/tour changes.
- **Secure** — HTTPS enforcement, XSS protection, dangerous scheme filtering on all URLs.

---

## Screenshots

### Demo

![Demo](screenshots/demo.gif)

### Visual Builder Mode
Click the **Builder** button to enter inspector mode. A floating toolbar appears at the top with quick actions including **Interactive UI Mode** and **Steps Drawer**.

![Builder Mode](screenshots/02-builder-mode.png)

### Compact Step Builder Modal
Configure tour steps easily with a segmented toggle between **Explanation Card** and **Auto Navigation**. Advanced options (CSS selector, breadcrumbs, card size, media URL) are neatly folded inside an accordion.

![Step Builder Modal](screenshots/03-step-builder-modal.png)

### Steps Manager Drawer
Manage all steps in a side drawer. Toggle wildcard URL matching ("Applica a pagine simili"), drag to reorder, edit, delete, or test individual steps.

![Steps Drawer](screenshots/04-steps-drawer.png)

### Theme Customization
Customize card style, accent color, highlight effect, and backdrop with a live preview.

![Theme Editor](screenshots/05-theme-editor.png)

### Keyboard Shortcuts Palette
Press `?` to open the interactive shortcuts reference.

![Keyboard Shortcuts](screenshots/06-keyboard-shortcuts.png)

---

## Requirements

- PHP >= 8.2
- Laravel 10, 11, or 12

---

## Installation

```bash
composer require taoshan98/laravel-onboarding-tour
php artisan migrate
```

Optionally publish configuration and translations:

```bash
php artisan vendor:publish --tag="onboarding-tour-config"
php artisan vendor:publish --tag="onboarding-tour-lang"
```

Other publishable assets:

```bash
# Blade views (for customization)
php artisan vendor:publish --tag="onboarding-tour-views"

# JS/CSS assets (to serve from public/ instead of inline)
php artisan vendor:publish --tag="onboarding-tour-assets"
```

---

## Usage

### 1. Add the component to your layout

Place `<x-onboarding-tour />` in your main layout file (e.g. `resources/views/layouts/app.blade.php`):

```blade
<body>
    {{ $slot }}

    <!-- Onboarding Tour Engine -->
    <x-onboarding-tour />
</body>
```

This injects the CSS, JS, and runtime configuration invisibly (headless).

### 2. Place trigger buttons in your navigation

```blade
<!-- Tour start button (visible when a tour exists for the current route) -->
<x-onboarding-tour-trigger />

<!-- Admin builder toggle (protect with your own authorization) -->
@can('manage-tours')
    <x-onboarding-tour-builder-toggle />
@endcan
```

### 3. Build a tour

1. Click the **Builder** button (or press `B`) to enter inspector mode.
2. If you need to switch tabs or open dropdowns before selecting an element, click **Navigazione UI** (Interactive Mode).
3. Click any element on the page to select it as a step target.
4. Choose the step mode:
   - **Card Spiegazione**: Shows a card with title, description, and optional media.
   - **Navigazione Automatica**: Silently clicks the target element to navigate UI and immediately moves to the next step.
5. Click **Add Step** — repeat for all steps.
6. Press `Ctrl+S` (or `Cmd+S`) or click **Save Tour** to persist.

The tour is saved via the REST API and cached automatically.

---

## Key Features Breakdown

### Auto Navigation (Action Steps)
Action steps execute a programmatic click on the targeted element (e.g. tab buttons, wizard step numbers) without displaying a card overlay. This allows seamless transitions across sub-interfaces before displaying subsequent explanation cards.

### Form Submission & Reload Guard
The engine includes a `safeClick` mechanism with `HTMLFormElement.prototype.submit` interception. Programmatic clicks executed by the tour runner are guarded so that buttons inside `<form>` elements or custom event handlers (like `@save-section`) do not trigger unintended page reloads or form submissions.

### Wildcard Route Matching
Enable "Applica a pagine simili" in the Steps Drawer to match dynamic routes (e.g., `/users/1/edit` matching `users/*/edit`).

---

## Multi-Language (i18n)

The package automatically discovers all locales available in your host application:

1. **Explicit config** — `config('onboarding-tour.locales')` (highest priority)
2. **Host app config** — `config('app.locales')`, `config('app.available_locales')`, or `config('app.supported_locales')`
3. **Filesystem scan** — Subdirectories and `.json` files in your `lang/` folder
4. **Always included** — `app()->getLocale()` and `config('app.fallback_locale')`

### Default language indicator

The language configured in `config('app.locale')` is shown **first** in the builder modal. If an admin fills in content only for the default language, that content is used as fallback for all other languages.

```php
// config/onboarding-tour.php
'locales' => ['en', 'it', 'de', 'fr'], // null = auto-discover
```

---

## Keyboard Shortcuts

Press `?` to open the interactive shortcuts palette.

| Key | Action | Context |
|---|---|---|
| `→` / `L` / `Space` | Next step | Active tour |
| `←` / `H` | Previous step | Active tour |
| `Enter` | Finish tour | Active tour |
| `ESC` | Dismiss / Close | Tour, modal, drawer |
| `?` / `Shift+/` | Toggle shortcuts palette | Global |
| `B` | Toggle builder mode | Admin |
| `S` | Open steps drawer | Builder mode |
| `T` | Open theme drawer | Builder mode |
| `Ctrl+S` / `Cmd+S` | Save tour | Builder mode |

All interactive elements support **Tab / Shift+Tab** focus trapping and ARIA attributes for accessibility.

---

## Theme Customization

Themes are managed entirely through the **admin UI** — no config files needed. The global theme is persisted to the database and cached for performance. Per-tour overrides are also supported.

### Card styles

| Style | Description |
|---|---|
| `auto` | Follows host app theme (light/dark) |
| `glass` | Glassmorphism with backdrop blur |
| `dark` | Always dark card |
| `light` | Always light card |

### Highlight styles

| Style | Description |
|---|---|
| `minimal` | Thin border with subtle shadow |
| `ring` | Border with outer ring |
| `glow` | Pulsing glow effect |
| `dashed` | Dashed border with tinted background |
| `none` | No highlight border |

### Backdrop presets

| Preset | Color |
|---|---|
| Midnight Slate | `#0f172a` |
| Deep Indigo | `#1e1b4b` |
| Emerald Night | `#022c22` |
| Soft Charcoal | `#334155` |

Opacity is adjustable from 20% to 95% via the live preview slider.

---

## Configuration

```php
// config/onboarding-tour.php

return [
    // Master switch
    'enabled' => env('ONBOARDING_TOUR_ENABLED', true),

    // API routes
    'route_prefix' => 'api/onboarding-tour',
    'middleware'    => ['web', 'auth'],

    // Locales: null = auto-discover from host app
    'locales' => null,

    // Cache
    'cache_ttl'    => 86400,              // 24 hours (seconds)
    'cache_prefix' => 'onboarding_tour:', // Redis key prefix
];
```

---

## REST API

All endpoints use the configured `route_prefix` and `middleware`.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/config?route_name={route}` | Get tour data, theme, translations, and locales for a route |
| `POST` | `/save` | Create or update a tour with steps |
| `POST` | `/save-global-theme` | Update the global theme settings |
| `POST` | `/complete` | Mark a tour as completed or dismissed for the current user |
| `POST` | `/delete` | Delete a tour by route name |

---

## How It Works

### Architecture

```
┌─────────────────────────────────────────────┐
│  Blade Component: <x-onboarding-tour />     │
│  Inlines CSS + JS + config JSON             │
└──────────────────┬──────────────────────────┘
                   │
      ┌────────────▼────────────┐
      │   tour-engine.js        │
      │   (Vanilla JS, IIFE)    │
      │                         │
      │  • Tour runner          │
      │  • Visual builder       │
      │  • Auto-navigation      │
      │  • Form reload guard    │
      │  • Theme editor         │
      │  • Keyboard shortcuts   │
      │  • Media lightbox       │
      └────────────┬────────────┘
                   │ fetch()
      ┌────────────▼────────────┐
      │  TourApiController      │
      │  (REST API)             │
      └────────────┬────────────┘
                   │
      ┌────────────▼────────────┐
      │  TourCacheService       │
      │  • Cache layer          │
      │  • Locale discovery     │
      │  • Translation resolver │
      └────────────┬────────────┘
                   │
      ┌────────────▼────────────┐
      │  Eloquent Models        │
      │  • OnboardingTour       │
      │  • OnboardingTourStep   │
      │  • OnboardingTourUser   │
      └─────────────────────────┘
```

---

## Customizing Views

Publish and edit the Blade templates:

```bash
php artisan vendor:publish --tag="onboarding-tour-views"
```

This copies the views to `resources/views/vendor/onboarding-tour/` where you can customize:

- `components/tour-runner.blade.php` — Main component (CSS/JS injection)
- `components/tour-trigger.blade.php` — Start tour button
- `components/tour-builder-toggle.blade.php` — Admin builder toggle button

---

## Customizing Translations

Publish and edit translation files:

```bash
php artisan vendor:publish --tag="onboarding-tour-lang"
```

Available languages: `en`, `it`. Add more by creating new files in `lang/vendor/onboarding-tour/{locale}/messages.php`.

---

## Security

- All media URLs are sanitized: only `https://`, relative paths (`/`), and `data:image/` are allowed
- `http://` URLs are automatically upgraded to `https://`
- Dangerous schemes (`javascript:`, `data:text/html`, etc.) are blocked
- External links use `rel="noopener noreferrer"` protection

---

## License

The MIT License (MIT). See [LICENSE](LICENSE) for details.
