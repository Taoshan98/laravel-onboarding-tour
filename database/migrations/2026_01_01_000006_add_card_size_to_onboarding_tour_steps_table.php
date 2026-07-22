<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('onboarding_tour_steps') && !Schema::hasColumn('onboarding_tour_steps', 'card_size')) {
            Schema::table('onboarding_tour_steps', function (Blueprint $table) {
                $table->string('card_size')->nullable()->after('video_url');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('onboarding_tour_steps') && Schema::hasColumn('onboarding_tour_steps', 'card_size')) {
            Schema::table('onboarding_tour_steps', function (Blueprint $table) {
                $table->dropColumn('card_size');
            });
        }
    }
};
