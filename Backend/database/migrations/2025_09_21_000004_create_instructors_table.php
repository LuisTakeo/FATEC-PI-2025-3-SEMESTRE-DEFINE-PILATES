<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('instructors', function (Blueprint $table) {
            $table->id('Id_instructors');
            $table->unsignedBigInteger('Id_collaborators')->index();
            $table->string('cref', 30)->nullable();
            $table->string('crefito', 30)->nullable();
            $table->date('birthday')->nullable();
            $table->date('hiring')->nullable();
            $table->string('classification', 50)->nullable();
            $table->timestamps();

            $table->foreign('Id_collaborators')->references('Id_collaborators')->on('collaborators')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('instructors');
    }
};