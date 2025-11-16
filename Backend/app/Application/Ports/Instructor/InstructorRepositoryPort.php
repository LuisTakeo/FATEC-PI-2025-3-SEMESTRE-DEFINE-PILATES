<?php

namespace App\Application\Ports\Instructor;

use App\Application\DTOs\InstructorDTO;

interface InstructorRepositoryPort {
    public function create(InstructorDTO $instructor);
    public function getInstructorByLoginName(String $nameuser);
    public function getAllInstructors(): array;
}