<?php

namespace Taoshan\LaravelOnboardingTour\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OnboardingTour extends Model
{
    protected $fillable = [
        'route_name',
        'title',
        'description',
        'is_active',
        'auto_start',
        'highlight_theme',
        'theme_settings',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'auto_start' => 'boolean',
        'theme_settings' => 'array',
    ];

    public function steps(): HasMany
    {
        return $this->hasMany(OnboardingTourStep::class, 'tour_id')->orderBy('sort_order', 'asc');
    }
}
