<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id('Id_plans');
            $table->unsignedBigInteger('Id_type_plans')->index();
            $table->unsignedBigInteger('Id_students')->index();
            $table->date('datebeginning')->nullable();
            $table->date('datefinal')->nullable();
            $table->enum('statusplan', ['Active','Inactive'])->default('Active');
            $table->integer('frequency')->nullable();
            $table->decimal('baseprice', 10, 3)->nullable();
            $table->timestamps();

            $table->foreign('Id_type_plans')->references('Id_type_plans')->on('type_plans')->onDelete('cascade');
            $table->foreign('Id_students')->references('Id_students')->on('students')->onDelete('cascade');
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};