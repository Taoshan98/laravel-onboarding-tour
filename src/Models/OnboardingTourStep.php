<?php

namespace Taoshan\LaravelOnboardingTour\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OnboardingTourStep extends Model
{
    protected $fillable = [
        'tour_id',
        'element_selector',
        'target_text',
        'trigger_selector',
        'title',
        'description',
        'video_url',
        'card_size',
        'is_action',
        'position',
        'sort_order',
    ];

    protected $casts = [
        'title'       => 'array',
        'description' => 'array',
        'video_url'   => 'array',
        'is_action'   => 'boolean',
        'sort_order'  => 'integer',
    ];

    public function tour(): BelongsTo
    {
        return $this->belongsTo(OnboardingTour::class, 'tour_id');
    }

    /**
     * Resolve localized attribute with fallback
     */
    public function getTranslatedAttribute(string $attribute, ?string $locale = null): ?string
    {
        return \Taoshan\LaravelOnboardingTour\Services\TourCacheService::resolveTranslation(
            $this->{$attribute},
            $locale
        );
    }
}
