<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  
    public function up(): void
    {
        Schema::create('type_classes', function (Blueprint $table) {
            $table->id('Id_type_classes');
            $table->string('typeclass', 20);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('type_classes');
    }
};