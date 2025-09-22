<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
 
    public function up(): void
    {
        Schema::create('schedule_studios', function (Blueprint $table) {
            $table->id('Id_schedule_studios');
            $table->unsignedBigInteger('Id_type_classes')->index();
            $table->unsignedBigInteger('Id_instructors')->index();
            $table->unsignedBigInteger('Id_students')->index();
            $table->string('observation', 200)->nullable();
            $table->date('scheduledate')->nullable();
            $table->time('scheduletime')->nullable();
            $table->timestamps();

            $table->foreign('Id_type_classes')->references('Id_type_classes')->on('type_classes')->onDelete('cascade');
            $table->foreign('Id_instructors')->references('Id_instructors')->on('instructors')->onDelete('cascade');
            $table->foreign('Id_students')->references('Id_students')->on('students')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('schedule_studios');
    }
};