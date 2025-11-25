<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $driver = DB::connection()->getDriverName();

        if ($driver === 'mysql') {
            // MySQL: INNER JOIN syntax
            DB::statement("
                UPDATE users u
                INNER JOIN students s ON u.id_users = s.id_users
                SET u.fullname = s.namestudent
                WHERE u.typeuser = 'Student' AND s.namestudent IS NOT NULL
            ");
        } else {
            // PostgreSQL: FROM syntax
            DB::statement("
                UPDATE users u
                SET fullname = s.namestudent
                FROM students s
                WHERE u.id_users = s.id_users 
                AND u.typeuser = 'Student' 
                AND s.namestudent IS NOT NULL
            ");
        }
    }

    public function down(): void
    {
        // ✅ Reverter: limpar fullname dos usuários
        DB::statement("
            UPDATE users 
            SET fullname = NULL 
            WHERE typeuser = 'Student'
        ");
    }
};
