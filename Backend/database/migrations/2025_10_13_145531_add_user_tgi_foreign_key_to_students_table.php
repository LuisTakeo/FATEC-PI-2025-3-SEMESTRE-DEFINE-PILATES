<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1) Adiciona a coluna somente se não existir
        if (!Schema::hasColumn('students', 'Id_users')) {
            Schema::table('students', function (Blueprint $table) {
                $table->unsignedBigInteger('Id_users')->nullable()->after('Id_classprofessions');
            });
        }

        // 2) Tenta tornar NOT NULL (requer doctrine/dbal). Se falhar, ignore ou instale dbal.
        if (Schema::hasColumn('students', 'Id_users')) {
            try {
                Schema::table('students', function (Blueprint $table) {
                    $table->unsignedBigInteger('Id_users')->nullable(false)->change();
                });
            } catch (\Throwable $e) {
                // Opcional: composer require doctrine/dbal
            }
        }

        // 3) Cria FK se não existir
        $fkName = 'fk_students_Id_users';
        if (!$this->foreignKeyExists('students', $fkName)) {
            Schema::table('students', function (Blueprint $table) use ($fkName) {
                $table->foreign('Id_users', $fkName)
                    ->references('Id_users')
                    ->on('users')
                    ->onDelete('cascade')
                    ->onUpdate('cascade');
            });
        }

        // 4) Cria UNIQUE se não existir (um user = um student)
        $uniqueName = 'students_Id_users_unique';
        if (!$this->indexExists('students', $uniqueName)) {
            Schema::table('students', function (Blueprint $table) use ($uniqueName) {
                $table->unique('Id_users', $uniqueName);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $fkName = 'fk_students_Id_users';
        $uniqueName = 'students_Id_users_unique';

        Schema::table('students', function (Blueprint $table) use ($fkName, $uniqueName) {
            if ($this->indexExists('students', $uniqueName)) {
                $table->dropUnique($uniqueName);
            }
            if ($this->foreignKeyExists('students', $fkName)) {
                $table->dropForeign($fkName);
            }
        });

        if (Schema::hasColumn('students', 'Id_users')) {
            Schema::table('students', function (Blueprint $table) {
                $table->dropColumn('Id_users');
            });
        }
    }

    // Helpers para checar existência de índice/constraint (MySQL)
    protected function indexExists(string $table, string $index): bool
    {
        $db = DB::getDatabaseName();
        $row = DB::selectOne(
            'SELECT COUNT(1) AS cnt FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND INDEX_NAME = ?',
            [$db, $table, $index]
        );
        return (int)($row->cnt ?? 0) > 0;
    }

    protected function foreignKeyExists(string $table, string $constraint): bool
    {
        $db = DB::getDatabaseName();
        $row = DB::selectOne(
            'SELECT COUNT(1) AS cnt FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_SCHEMA = ? AND TABLE_NAME = ? AND CONSTRAINT_NAME = ? AND CONSTRAINT_TYPE = "FOREIGN KEY"',
            [$db, $table, $constraint]
        );
        return (int)($row->cnt ?? 0) > 0;
    }
};
