<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('onboarding_tour_steps')) {
            Schema::table('onboarding_tour_steps', function (Blueprint $table) {
                $table->json('title')->nullable()->change();
                $table->json('description')->nullable()->change();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('onboarding_tour_steps')) {
            Schema::table('onboarding_tour_steps', function (Blueprint $table) {
                $table->json('title')->nullable(false)->change();
                $table->json('description')->nullable(false)->change();
            });
        }
    }
};
