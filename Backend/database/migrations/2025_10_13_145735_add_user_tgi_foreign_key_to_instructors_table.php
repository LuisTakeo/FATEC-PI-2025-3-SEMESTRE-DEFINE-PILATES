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
            // Assumindo que existe id_instructors como primeira coluna
            $table->unsignedBigInteger('id_users')->after('id_instructors');
            
            // ✅ Criar foreign key constraint
            $table->foreign('id_users')
                  ->references('id_users')
                  ->on('users')
                  ->onDelete('cascade') // Se deletar user, deleta instructor
                  ->onUpdate('cascade'); // Se atualizar ID user, atualiza instructor
            
            // ✅ Criar índice para performance
            $table->index('id_users');
            
            // ✅ Garantir que cada UserTgi só pode ter um Instructor
            $table->unique('id_users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('instructors', function (Blueprint $table) {
            // ✅ Remover constraint unique primeiro
            $table->dropUnique(['id_users']);
            
            // ✅ Remover foreign key
            $table->dropForeign(['id_users']);
            
            // ✅ Remover índice
            $table->dropIndex(['id_users']);
            
            // ✅ Remover coluna
            $table->dropColumn('id_users');
        });
    }
};
