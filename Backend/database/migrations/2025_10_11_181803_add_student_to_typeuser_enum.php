<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $driver = DB::connection()->getDriverName();

        if ($driver === 'mysql') {
            // MySQL: Modificar ENUM
            DB::statement("ALTER TABLE users MODIFY COLUMN typeuser ENUM('Administrator', 'Instructor', 'Receptionist', 'Student') NOT NULL");
            DB::statement("ALTER TABLE users MODIFY COLUMN statususer ENUM('Active', 'Inactive') DEFAULT 'Active'");
        } else {
            // PostgreSQL: Recriar coluna como VARCHAR com CHECK constraint
            Schema::table('users', function (Blueprint $table) {
                $table->string('typeuser_new', 50)->nullable();
            });

            DB::statement("UPDATE users SET typeuser_new = typeuser");

            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('typeuser');
            });

            Schema::table('users', function (Blueprint $table) {
                $table->renameColumn('typeuser_new', 'typeuser');
            });

            DB::statement("ALTER TABLE users ALTER COLUMN typeuser SET NOT NULL");
            DB::statement("ALTER TABLE users ADD CONSTRAINT users_typeuser_check CHECK (typeuser IN ('Administrator', 'Instructor', 'Receptionist', 'Student'))");
        }
    }

    public function down(): void
    {
        $driver = DB::connection()->getDriverName();

        if ($driver === 'mysql') {
            // MySQL: Reverter ENUM
            DB::statement("ALTER TABLE users MODIFY COLUMN typeuser ENUM('Administrator', 'Instructor', 'Receptionist') NOT NULL");
        } else {
            // PostgreSQL: Remover constraint e recriar
            DB::statement("ALTER TABLE users DROP CONSTRAINT IF EXISTS users_typeuser_check");

            Schema::table('users', function (Blueprint $table) {
                $table->string('typeuser_new', 50)->nullable();
            });

            DB::statement("UPDATE users SET typeuser_new = typeuser");

            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('typeuser');
            });

            Schema::table('users', function (Blueprint $table) {
                $table->renameColumn('typeuser_new', 'typeuser');
            });

            DB::statement("ALTER TABLE users ALTER COLUMN typeuser SET NOT NULL");
            DB::statement("ALTER TABLE users ADD CONSTRAINT users_typeuser_check CHECK (typeuser IN ('Administrator', 'Instructor', 'Receptionist'))");
        }
    }
};