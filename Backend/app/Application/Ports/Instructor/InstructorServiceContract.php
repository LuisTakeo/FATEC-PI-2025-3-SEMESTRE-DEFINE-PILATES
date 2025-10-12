<?php

namespace App\Application\Ports\Instructor;

use App\Application\DTOs\InstructorDTO;

interface InstructorServiceContract {
    public function registerInstructor(InstructorDTO $instructorDTO): array;
}