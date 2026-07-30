<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('onboarding_tour_steps') && !Schema::hasColumn('onboarding_tour_steps', 'is_action')) {
            Schema::table('onboarding_tour_steps', function (Blueprint $table) {
                $table->boolean('is_action')->default(false)->after('card_size');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('onboarding_tour_steps') && Schema::hasColumn('onboarding_tour_steps', 'is_action')) {
            Schema::table('onboarding_tour_steps', function (Blueprint $table) {
                $table->dropColumn('is_action');
            });
        }
    }
};
