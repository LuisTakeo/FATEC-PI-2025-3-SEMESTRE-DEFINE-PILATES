<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // ✅ Modificar ENUM para incluir 'Student'
        DB::statement("ALTER TABLE users MODIFY COLUMN typeuser ENUM('Administrator', 'Instructor', 'Receptionist', 'Student') NOT NULL");
        DB::statement("ALTER TABLE users MODIFY COLUMN statususer ENUM('Active', 'Inactive') DEFAULT 'Active'");
    }

    public function down(): void
    {
        // ✅ Reverter para ENUM original
        DB::statement("ALTER TABLE users MODIFY COLUMN typeuser ENUM('Administrator', 'Instructor', 'Receptionist') NOT NULL");
    }
};