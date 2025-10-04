<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('profession_classifications', function (Blueprint $table) {
            $table->id('Id_classprofessions');
            $table->string('classifications', 50);
         
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profession_classifications');
    }
};