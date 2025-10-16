<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('type_plans', function (Blueprint $table) {
            $table->id('Id_type_plans');
            $table->string('type', 50);
            $table->integer('weeklyfrequency')->nullable();
            $table->decimal('baseprice', 10, 3)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('type_plans');
    }
};