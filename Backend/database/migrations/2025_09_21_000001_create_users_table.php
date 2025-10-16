<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('id_users');
            $table->string('nameuser', 50);
            $table->string('passworduser', 50);
            $table->enum('typeuser', ['Administrator', 'Instructor', 'Receptionist']);
            $table->enum('statususer', ['Active', 'Inactive'])->default('Active');
            $table->boolean('email_sent')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};