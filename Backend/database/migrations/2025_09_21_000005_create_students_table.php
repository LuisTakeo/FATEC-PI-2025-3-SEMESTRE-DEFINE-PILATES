<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id('Id_students');
            $table->string('namestudent', 120);
            $table->char('cpf', 11)->unique();
            $table->unsignedBigInteger('Id_classprofessions')->nullable()->index();
            $table->timestamps();

            $table->foreign('Id_classprofessions')->references('Id_classprofessions')
                  ->on('profession_classifications')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};