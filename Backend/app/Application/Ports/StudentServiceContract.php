<?php

namespace App\Application\Ports;

use App\Application\DTOs\StudentDTO;

interface StudentServiceContract
{
    // Define service contract methods here
    public function registerStudent(StudentDTO $studentDTO): array;
}
