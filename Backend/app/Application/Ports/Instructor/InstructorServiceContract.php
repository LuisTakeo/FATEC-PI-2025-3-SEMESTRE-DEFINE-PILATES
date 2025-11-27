<?php

namespace App\Application\Ports\Instructor;

use App\Application\DTOs\InstructorDTO;

interface InstructorServiceContract {
    public function registerInstructor(InstructorDTO $instructorDTO): array;

    public function loginInstructor(string $nameuser, string $password): array;
    
    public function listInstructors(): array;

    public function getInstructorClasses(int $instructorId): array;

    public function updateStudentAttendance(int $instructorId, int $studentId, int $classId, string $status): array;
}