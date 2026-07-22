<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('onboarding_tours', 'theme_settings')) {
            Schema::table('onboarding_tours', function (Blueprint $table) {
                $table->json('theme_settings')->nullable()->after('auto_start');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('onboarding_tours', 'theme_settings')) {
            Schema::table('onboarding_tours', function (Blueprint $table) {
                $table->dropColumn('theme_settings');
            });
        }
    }
};
