<?php

namespace App\Adapters\Database;

use App\Application\DTOs\StudentDTO;
use App\Application\Ports\StudentRepositoryPort;

class StudentMySQLAdapter implements StudentRepositoryPort
{
    
    public function __construct()
    {
        // Inject dependencies here
    }

    public function save(StudentDTO $student): bool
    {
        return true;
    }
}
