<?php

namespace App\Adapters\Database;

use App\Application\Ports\StudentRepositoryPort;

class StudentMySQLAdapter implements StudentRepositoryPort
{
    
    public function __construct()
    {
        // Inject dependencies here
    }
}
