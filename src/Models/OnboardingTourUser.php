<?php

namespace Taoshan\LaravelOnboardingTour\Models;

use Illuminate\Database\Eloquent\Model;

class OnboardingTourUser extends Model
{
    protected $table = 'onboarding_tour_user';

    protected $fillable = [
        'user_id',
        'tour_id',
        'completed_at',
        'dismissed_at',
    ];

    protected $casts = [
        'completed_at' => 'datetime',
        'dismissed_at' => 'datetime',
    ];
}
