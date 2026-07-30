<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('onboarding_tour_steps') && !Schema::hasColumn('onboarding_tour_steps', 'trigger_selector')) {
            Schema::table('onboarding_tour_steps', function (Blueprint $table) {
                $table->string('trigger_selector')->nullable()->after('target_text');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('onboarding_tour_steps') && Schema::hasColumn('onboarding_tour_steps', 'trigger_selector')) {
            Schema::table('onboarding_tour_steps', function (Blueprint $table) {
                $table->dropColumn('trigger_selector');
            });
        }
    }
};
