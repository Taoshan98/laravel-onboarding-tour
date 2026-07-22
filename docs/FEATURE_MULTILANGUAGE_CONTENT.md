# Technical Specification: Host-Aligned Multi-Language Step Architecture

## 📌 Feature Overview
This document specifies the technical design and architectural blueprint for **Host-Aligned Multi-Language Steps** in `laravel-onboarding-tour`. 

It enables package users to define **N Titles**, **N Descriptions**, and **N Media URLs** for every locale configured in the host Laravel application, seamlessly managed via **Language Tabs** inside the Step Builder Modal.

---

## 🎯 Key Requirements & Goals
1. **Dynamic Host Alignment**: Automatically discover all supported locales from the host Laravel application (`config('onboarding-tour.locales')` or `config('app.locales', ['it', 'en'])`).
2. **Tabbed Language Editor**: The Step Builder Modal renders clean tabs (`[ IT ]`, `[ EN ]`, `[ FR ]`, etc.) allowing administrators to configure Titles, Descriptions, and Media URLs independently for each language.
3. **JSON Cast & Backward Compatibility**: Store translatable fields in database JSON columns (`title`, `description`, `video_url`/`media_url`), maintaining 100% backward compatibility for single-language setups.
4. **Locale Resolution & Fallback**: Resolve step content automatically based on the active host locale (`app()->getLocale()`), falling back to `config('app.fallback_locale', 'it')`.

---

## 🗄️ Database Schema & Data Structure

### Migration Spec (`database/migrations/xxxx_xx_xx_update_onboarding_tour_steps_for_i18n.php`)

```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('onboarding_tour_steps', function (Blueprint $table) {
            // Convert string/text columns to JSON translatable attributes
            $table->json('title')->change();
            $table->json('description')->change();
            $table->json('video_url')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('onboarding_tour_steps', function (Blueprint $table) {
            $table->string('title')->change();
            $table->text('description')->change();
            $table->string('video_url')->nullable()->change();
        });
    }
};
```

---

## 💾 Model Implementation & Translatable Trait (`src/Models/OnboardingTourStep.php`)

```php
namespace Taoshan\LaravelOnboardingTour\Models;

use Illuminate\Database\Eloquent\Model;

class OnboardingTourStep extends Model
{
    protected $table = 'onboarding_tour_steps';

    protected $casts = [
        'title'       => 'array',
        'description' => 'array',
        'video_url'   => 'array',
        'sort_order'  => 'integer',
    ];

    /**
     * Resolve localized attribute with fallback
     */
    public function getTranslatedAttribute(string $attribute, ?string $locale = null): ?string
    {
        $locale = $locale ?? app()->getLocale();
        $fallback = config('app.fallback_locale', 'it');
        $data = $this->{$attribute};

        if (is_string($data)) {
            return $data; // Legacy fallback
        }

        if (is_array($data)) {
            return $data[$locale] ?? ($data[$fallback] ?? (reset($data) ?: null));
        }

        return null;
    }
}
```

---

## 🖥️ UI Design: Step Builder Modal with Language Tabs

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ✏️ Edit Step #2                                                    ✕   │
├─────────────────────────────────────────────────────────────────────────┤
│  Language: [ 🇮🇹 IT ]  [ 🇬🇧 EN ]  [ 🇫🇷 FR ]  [ 🇩🇪 DE ]                │
├─────────────────────────────────────────────────────────────────────────┤
│  Target Element (CSS Selector):                                         │
│  [ #filter-dropdown-btn                                               ] │
│                                                                         │
│  Title (IT):                                                            │
│  [ Filtri di Ricerca Avanzata                                         ] │
│                                                                         │
│  Description (IT):                                                      │
│  [ Utilizza questi filtri per affinare la ricerca dei documenti.      ] │
│                                                                         │
│  Media URL (IT):                                                        │
│  [ https://assets.tecnovat.it/guides/it/filter-demo.mp4               ] │
├─────────────────────────────────────────────────────────────────────────┤
│                                                [ Cancel ]  [ Save Step ]│
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Step Builder Modal Implementation (`resources/js/tour-engine.js`)

```javascript
// Step Builder Modal Rendering with Dynamic Language Tabs
openStepBuilderModal: function (targetEl, stepIdx = null) {
    const isEdit = (stepIdx !== null);
    const existingStep = isEdit ? this.draftSteps[stepIdx] : null;

    // Get host application locales from config
    const configuredLocales = this.config.locales || ['it', 'en'];
    let activeModalLocale = configuredLocales[0];

    // Helper to extract localized value
    const getLocVal = (obj, loc) => {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        return obj[loc] || '';
    };

    // Render Modal with Language Tabs
    const langTabsHtml = configuredLocales.map(loc => `
        <button type="button" class="tour-lang-tab-pill ${loc === activeModalLocale ? 'active' : ''}" data-loc="${loc}">
            <span class="uppercase font-bold">${loc}</span>
        </button>
    `).join('');

    const langFieldsHtml = configuredLocales.map(loc => `
        <div class="tour-lang-panel ${loc === activeModalLocale ? '' : 'hidden'}" data-loc-panel="${loc}">
            <div class="space-y-3">
                <div>
                    <label class="tour-label">${t('step_title_label', 'Title')} (${loc.toUpperCase()})</label>
                    <input type="text" data-field="title" data-loc="${loc}" value="${getLocVal(existingStep?.title, loc)}" class="tour-input" placeholder="Title in ${loc.toUpperCase()}" />
                </div>
                <div>
                    <label class="tour-label">${t('step_content_label', 'Description')} (${loc.toUpperCase()})</label>
                    <textarea data-field="description" data-loc="${loc}" rows="3" class="tour-textarea" placeholder="Description in ${loc.toUpperCase()}">${getLocVal(existingStep?.description, loc)}</textarea>
                </div>
                <div>
                    <label class="tour-label">${t('media_url_label', 'Media URL')} (${loc.toUpperCase()})</label>
                    <input type="text" data-field="video_url" data-loc="${loc}" value="${getLocVal(existingStep?.video_url, loc)}" class="tour-input" placeholder="https://..." />
                </div>
            </div>
        </div>
    `).join('');

    // Modal Container & Event Handlers
    // Language Tab Switcher
    modal.querySelectorAll('.tour-lang-tab-pill').forEach(btn => {
        btn.onclick = () => {
            const selectedLoc = btn.getAttribute('data-loc');
            modal.querySelectorAll('.tour-lang-tab-pill').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            modal.querySelectorAll('.tour-lang-panel').forEach(panel => {
                panel.classList.toggle('hidden', panel.getAttribute('data-loc-panel') !== selectedLoc);
            });
        };
    });
}
```

---

## ⚡ API & Serialization Blueprint (`TourCacheService.php`)

When returning a tour via `/api/onboarding-tour/config`, `TourCacheService` automatically resolves the step content to the active host locale:

```php
'steps' => $tour->steps->map(function ($s) use ($currentLocale) {
    return [
        'id'               => $s->id,
        'element_selector' => $s->element_selector,
        'target_text'      => $s->target_text,
        'title'            => $s->getTranslatedAttribute('title', $currentLocale),
        'description'      => $s->getTranslatedAttribute('description', $currentLocale),
        'video_url'        => $s->getTranslatedAttribute('video_url', $currentLocale),
        'title_i18n'       => $s->title,       // Complete dictionary for builder
        'description_i18n' => $s->description, // Complete dictionary for builder
        'video_url_i18n'   => $s->video_url,   // Complete dictionary for builder
    ];
})->toArray();
```
