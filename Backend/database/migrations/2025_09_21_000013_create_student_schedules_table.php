<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('student_schedules', function (Blueprint $table) {
            $table->unsignedBigInteger('Id_schedule_studios')->index();
            $table->unsignedBigInteger('Id_students')->index();
            $table->primary(['Id_schedule_studios','Id_students']);

            $table->foreign('Id_schedule_studios')->references('Id_schedule_studios')->on('schedule_studios')->onDelete('cascade');
            $table->foreign('Id_students')->references('Id_students')->on('students')->onDelete('cascade');
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('student_schedules');
    }
};