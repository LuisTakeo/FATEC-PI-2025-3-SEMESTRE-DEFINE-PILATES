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
        Schema::table('instructors', function (Blueprint $table) {
            // ✅ Adicionar coluna para FK do UserTgi
            // Assumindo que existe Id_instructors como primeira coluna
            $table->unsignedBigInteger('Id_users')->after('Id_instructors');
            
            // ✅ Criar foreign key constraint
            $table->foreign('Id_users')
                  ->references('Id_users')
                  ->on('users')
                  ->onDelete('cascade') // Se deletar user, deleta instructor
                  ->onUpdate('cascade'); // Se atualizar ID user, atualiza instructor
            
            // ✅ Criar índice para performance
            $table->index('Id_users');
            
            // ✅ Garantir que cada UserTgi só pode ter um Instructor
            $table->unique('Id_users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('instructors', function (Blueprint $table) {
            // ✅ Remover constraint unique primeiro
            $table->dropUnique(['Id_users']);
            
            // ✅ Remover foreign key
            $table->dropForeign(['Id_users']);
            
            // ✅ Remover índice
            $table->dropIndex(['Id_users']);
            
            // ✅ Remover coluna
            $table->dropColumn('Id_users');
        });
    }
};
