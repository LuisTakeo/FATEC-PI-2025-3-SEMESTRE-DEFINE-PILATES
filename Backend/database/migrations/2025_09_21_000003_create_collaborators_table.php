<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
 
    public function up(): void
    {
        Schema::create('collaborators', function (Blueprint $table) {
            $table->id('Id_collaborators');
            $table->unsignedBigInteger('Id_users')->index();
            $table->string('typecollaborator', 50)->nullable();
            $table->date('birthday')->nullable();
            $table->string('fulladdress', 100)->nullable();
            $table->date('hiring')->nullable();
            $table->string('classification', 50)->nullable();
            $table->timestamps();

            $table->foreign('id_users')->references('id_users')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('collaborators');
    }
};