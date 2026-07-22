<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('onboarding_tour_user', function (Blueprint $table) {
            $table->id();
            $table->morphs('user');
            $table->foreignId('tour_id')->constrained('onboarding_tours')->cascadeOnDelete();
            $table->timestamp('completed_at')->nullable();
            $table->timestamp('dismissed_at')->nullable();
            $table->timestamps();

            $table->unique(['user_type', 'user_id', 'tour_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('onboarding_tour_user');
    }
};
