<?php

namespace App\Application\Ports;

use App\Application\DTOs\StudentDTO;

interface StudentServiceContract
{
    // Define service contract methods here
    public function getStudents(): array;

    public function registerStudent(StudentDTO $studentDTO): array;

    public function loginStudent(string $nameuser, string $password);

    public function listStudents(): array;
}
