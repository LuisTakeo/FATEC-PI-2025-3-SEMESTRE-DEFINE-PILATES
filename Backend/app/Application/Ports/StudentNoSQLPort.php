<?php

namespace App\Application\Ports;

use App\Application\DTOs\StudentDTO;
    
interface StudentNoSQLPort
{
    public const SUCCESS = true;
    public const FAILURE = false;
    // Define required contract methods
    public function saveStudentData(StudentDTO $studentDTO): array;
}
