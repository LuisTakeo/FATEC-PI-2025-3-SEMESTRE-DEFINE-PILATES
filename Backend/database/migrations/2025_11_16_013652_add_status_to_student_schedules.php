<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('student_schedules', function (Blueprint $table) {
            $table->enum('status', [
                'pending',
                'confirmed',
                'completed',
                'absent',
                'cancelled'
            ])->default('pending')->after('Id_schedule_studios');
        });
    }

    public function down(): void
    {
        Schema::table('student_schedules', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};