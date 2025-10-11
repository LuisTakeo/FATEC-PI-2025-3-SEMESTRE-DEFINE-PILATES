<?php

namespace App\Adapters\Database;

use App\Application\DTOs\StudentDTO;
use App\Application\Ports\StudentRepositoryPort;
use App\Models\Student;

class StudentMySQLAdapter implements StudentRepositoryPort
{
    
    public function __construct()
    {
        // Inject dependencies here
    }

    public function create(StudentDTO $student): bool
    {
        $instance = Student::create([
            'name' => $student->name,
            'phone' => $student->phone,
            'password' => $student->password,
            'cpf' => $student->cpf,
            'profession' => $student->profession
        ]);
        return true;
    }
}
