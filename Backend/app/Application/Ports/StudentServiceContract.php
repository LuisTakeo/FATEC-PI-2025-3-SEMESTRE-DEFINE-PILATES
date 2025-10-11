<?php

namespace App\Application\Ports;

use App\Adapters\Http\StudentDTORequest;

interface StudentServiceContract
{
    // Define service contract methods here
    public function registerStudent(StudentDTORequest $request): array;
}
