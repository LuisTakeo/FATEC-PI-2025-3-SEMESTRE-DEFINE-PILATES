<?php

namespace App\Application\Services\Student;


use App\Application\DTOs\StudentDTO;
use App\Application\Ports\NoSQLPort;
use App\Application\Ports\StudentRepositoryPort;
use App\Application\Ports\StudentServiceContract;
use Exception;
use Str;

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

    public function registerStudent(StudentDTO $studentDTO): array
    {
        try
        {
            $hasSave = $this->sqlAdapter->save($studentDTO);
            if (!$hasSave)
            {
                return [
                    'message' => 'Failed to register student',
                    'error' => 'Could not save to database',
                    'status' => 'error'
                ];
            }

        } catch (Exception $e)
        {

        }
        return [
        'message' => 'Acessando a Service',
        'data' => $studentDTO->withoutPassword(),
        'status' => 'success'
        ];
    }

    private function sanitizeStudentData(StudentDTO $dto): StudentDTO
    {
        return new StudentDTO(
            id: $dto->id,
            name: Str::title(trim(strip_tags($dto->name))),                    // Remove tags, trim, capitaliza
            phone: preg_replace('/[^0-9]/', '', $dto->phone),                  // Só números
            password: password_hash($dto->password, PASSWORD_DEFAULT),                                          // Não sanitizar senha (será hasheada)
            cpf: preg_replace('/[^0-9]/', '', $dto->cpf),                     // Só números
            profession: Str::title(trim(strip_tags($dto->profession)))        // Remove tags, trim, capitaliza
        );
    }
}
