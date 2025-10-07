<?php

namespace App\Application\Services\Student;

use App\Application\Ports\NoSQLPort;
use App\Application\Ports\StudentRepositoryPort;
use App\Application\Ports\StudentServiceContract;

class StudentService implements StudentServiceContract
{
    private StudentRepositoryPort $sqlAdapter;
    private NoSQLPort $noSQLAdapter;

    public function __construct(
        StudentRepositoryPort $sqlAdapter, 
        NoSQLPort $noSQLAdapter)
    {
        $this->sqlAdapter = $sqlAdapter;
        $this->noSQLAdapter = $noSQLAdapter;
    }

    // Example method (adjust/remove):
    public function example(array $input): array
    {
        return ['ok' => true];
    }
}
