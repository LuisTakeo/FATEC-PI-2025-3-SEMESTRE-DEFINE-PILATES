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
        Schema::table('schedule_studios', function (Blueprint $table) {
            // Tentar remover foreign key constraint (ignorar se não existir)
            try {
                $table->dropForeign(['Id_students']);
            } catch (\Exception $e) {
                // Foreign key não existe, continuar
            }
            
            // Remover a coluna
            $table->dropColumn('Id_students');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('schedule_studios', function (Blueprint $table) {
            // Recriar a coluna
            $table->unsignedBigInteger('Id_students')->nullable()->after('Id_schedulestudios');
            
            // Recriar a foreign key
            $table->foreign('Id_students')
                  ->references('Id_students')
                  ->on('students')
                  ->onDelete('cascade');
        });
    }
};
