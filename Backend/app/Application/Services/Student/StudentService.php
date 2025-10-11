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

    /**
     * @OA\Post(
     *     path="/api/students/save",
     *     tags={"Students"},
     *     summary="Register a new student",
     *     description="Create a new student account with user credentials",
     *     @OA\RequestBody(
     *         required=true,
     *         description="Student registration data",
     *         @OA\JsonContent(
     *             required={"name", "phone", "password", "cpf", "profession", "birth_date"},
     *             @OA\Property(property="name", type="string", maxLength=255, example="João Silva"),
     *             @OA\Property(property="phone", type="string", pattern="^(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$", example="11999999999"),
     *             @OA\Property(property="password", type="string", minLength=6, example="abc123A"),
     *             @OA\Property(property="cpf", type="string", maxLength=11, example="12345678901"),
     *             @OA\Property(property="profession", type="string", maxLength=255, example="Engenheiro"),
     *             @OA\Property(property="birth_date", type="string", format="date", pattern="dd-mm-yyyy", example="15-01-1990")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Student registered successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Student registered successfully"),
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="João Silva"),
     *                 @OA\Property(property="phone", type="string", example="11999999999"),
     *                 @OA\Property(property="cpf", type="string", example="12345678901"),
     *                 @OA\Property(property="profession", type="string", example="Engenheiro"),
     *                 @OA\Property(property="birth_date", type="string", example="15-01-1990")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Student registration failed"),
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="error", type="string", example="CPF already registered")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Failed to register student"),
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="error", type="string", example="Internal server error")
     *         )
     *     )
     * )
     */
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
            $studentDTOFiltered = $this->sanitizeStudentData($studentDTO);
            $hasSave = $this->sqlAdapter->create($studentDTOFiltered);
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
        'data' => $studentDTOFiltered->toArray(),
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
            profession: Str::title(trim(strip_tags($dto->profession))),
            birthDate: $dto->birthDate
        );
    }
}
