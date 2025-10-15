<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Cria índice único para nameuser
            $table->unique('nameuser', 'users_nameuser_unique');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Remove o índice único
            $table->dropUnique('users_nameuser_unique');
        });
    }
};
