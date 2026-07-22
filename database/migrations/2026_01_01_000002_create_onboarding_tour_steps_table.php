<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('onboarding_tour_steps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tour_id')->constrained('onboarding_tours')->cascadeOnDelete();
            $table->string('element_selector');
            $table->string('target_text')->nullable();
            $table->json('title');
            $table->json('description');
            $table->json('video_url')->nullable();
            $table->string('card_size')->default('md');
            $table->string('position')->default('auto');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('onboarding_tour_steps');
    }
};
