<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('onboarding_tour_steps', function (Blueprint $table) {
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
