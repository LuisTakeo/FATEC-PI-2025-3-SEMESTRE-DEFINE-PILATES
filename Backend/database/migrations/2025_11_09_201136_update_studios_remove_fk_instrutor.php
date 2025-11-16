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
        Schema::table('studios', function (Blueprint $table) {
            // Tentar remover foreign key constraint (ignorar se não existir)
            try {
                $table->dropForeign(['Id_instructors']);
            } catch (\Exception $e) {
                // Foreign key não existe, continuar
            }
            
            // Remover a coluna
            $table->dropColumn('Id_instructors');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::table('studios', function (Blueprint $table) {
            // Recriar a coluna
            $table->unsignedBigInteger('Id_instructors')->nullable()->after('Id_studios');
            
            // Recriar a foreign key
            $table->foreign('Id_instructors')
                  ->references('Id_instructors')
                  ->on('instructors')
                  ->onDelete('cascade');
        });
    }
};
