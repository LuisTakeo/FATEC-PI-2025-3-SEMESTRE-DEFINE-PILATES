<?php

namespace App\Application\Ports;

use App\Application\DTOs\StudentDTO;

interface StudentRepositoryPort
{
    // Define required contract methods
    public function create(StudentDTO $student);

    public function getStudentByLoginName(String $nameuser);
}
