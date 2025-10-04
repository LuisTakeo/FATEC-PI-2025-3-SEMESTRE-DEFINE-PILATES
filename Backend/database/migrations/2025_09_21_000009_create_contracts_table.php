<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   
    public function up(): void
    {
        Schema::create('contracts', function (Blueprint $table) {
            $table->id('Id_contracts');
            $table->unsignedBigInteger('Id_students')->index();
            $table->unsignedBigInteger('Id_plans')->index();
            $table->date('datebeginning')->nullable();
            $table->date('deadline')->nullable();
            $table->enum('contractstatus', ['Active','Inactive'])->default('Active');
            $table->boolean('freeuseimage')->default(false);
            $table->timestamps();

            $table->foreign('Id_students')->references('Id_students')->on('students')->onDelete('cascade');
            $table->foreign('Id_plans')->references('Id_plans')->on('plans')->onDelete('cascade');
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};