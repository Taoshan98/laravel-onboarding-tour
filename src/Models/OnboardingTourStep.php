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
        'title',
        'description',
        'video_url',
        'card_size',
        'position',
        'sort_order',
    ];

    public function tour(): BelongsTo
    {
        return $this->belongsTo(OnboardingTour::class, 'tour_id');
    }
}
