<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('onboarding_tours', 'highlight_theme')) {
            Schema::table('onboarding_tours', function (Blueprint $table) {
                $table->string('highlight_theme')->default('minimal')->after('auto_start');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('onboarding_tours', 'highlight_theme')) {
            Schema::table('onboarding_tours', function (Blueprint $table) {
                $table->dropColumn('highlight_theme');
            });
        }
    }
};
