<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // ✅ Migrar nomes de students para users.fullname
        DB::statement("
            UPDATE users u
            INNER JOIN students s ON u.id_users = s.Id_users
            SET u.fullname = s.namestudent
            WHERE u.typeuser = 'student' AND s.namestudent IS NOT NULL
        ");

        
    }

    public function down(): void
    {
        // ✅ Reverter: limpar fullname dos usuários
        DB::statement("
            UPDATE users 
            SET fullname = NULL 
            WHERE typeuser IN ('student')
        ");
    }
};
