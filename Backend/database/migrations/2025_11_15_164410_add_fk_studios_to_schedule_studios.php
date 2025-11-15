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

        // 1) Adiciona a coluna somente se não existir
        if (!Schema::hasColumn('schedule_studios', 'Id_studios')) {
            Schema::table('schedule_studios', function (Blueprint $table) {
                $table->unsignedBigInteger('Id_studios')->nullable()->after('Id_instructors');
            });
        }

        // 2) Tenta tornar NOT NULL (requer doctrine/dbal). Se falhar, ignore ou instale dbal.
        if (Schema::hasColumn('schedule_studios', 'Id_studios')) {
            try {
                Schema::table('schedule_studios', function (Blueprint $table) {
                    $table->unsignedBigInteger('Id_studios')->nullable(false)->change();
                });
            } catch (\Throwable $e) {
                // Opcional: composer require doctrine/dbal
            }
        }
        Schema::table('schedule_studios', function (Blueprint $table) {
            $table->unsignedBigInteger('Id_studios')->change();
            
            // Adicionar foreign key para studios
            $table->foreign('Id_studios')
                  ->references('Id_studios')
                  ->on('studios')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
        });

        // 3) Criar índice para performance
        Schema::table('schedule_studios', function (Blueprint $table) {
            $table->index('Id_studios');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('schedule_studios', function (Blueprint $table) {
            
            // ✅ Remover foreign key
            $table->dropForeign(['Id_studios']);
            
            // ✅ Remover índice
            $table->dropIndex(['Id_studios']);
            
            // ✅ Remover coluna
            $table->dropColumn('Id_studios');
        });
    }
};
