<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('studios', function (Blueprint $table) {
            $table->id('Id_studios');
            $table->unsignedBigInteger('Id_instructors')->index();
            $table->string('studioname', 50)->nullable();
            $table->string('address', 100)->nullable();
            $table->string('businesshour', 50)->nullable();
            $table->date('vacation')->nullable();
            $table->date('recess')->nullable();
            $table->timestamps();

            $table->foreign('Id_instructors')->references('Id_instructors')->on('instructors')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('studios');
    }
};