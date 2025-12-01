<?php

namespace App\Application\Services\Instructor;

use App\Application\DTOs\InstructorDTO;
use App\Application\Ports\NoSQLPort;
use App\Application\Ports\Instructor\InstructorRepositoryPort;
use App\Application\Ports\Instructor\InstructorServiceContract;
use App\Application\Ports\Aulas\AulasRepositoryPort;
use Exception;
use Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;

class InstructorService implements InstructorServiceContract
{
    private InstructorRepositoryPort $sqlAdapter;
    private NoSQLPort $noSQLAdapter;
    private AulasRepositoryPort $aulasAdapter;


   public function __construct(
        InstructorRepositoryPort $sqlAdapter,
        NoSQLPort $noSQLAdapter,
        AulasRepositoryPort $aulasAdapter
    ) {
        $this->sqlAdapter = $sqlAdapter;
        $this->noSQLAdapter = $noSQLAdapter;
        $this->aulasAdapter = $aulasAdapter;
    }

    /**
     * Registers a new instructor in the system.
     *
     * @param InstructorDTO $instructorDTO
     * @return array
     */
    public function registerInstructor(InstructorDTO $instructorDTO): array
    {
        try {
            $instructorDTOFiltered = $this->sanitizeInstructorData($instructorDTO);

            $savedInstructor = $this->sqlAdapter->create($instructorDTOFiltered);

            if (!$savedInstructor) {
                throw new Exception();
            }

            return [
                'message' => 'Instructor registered successfully',
                'status' => 'success'
            ];

        } catch (Exception $e) {
            Log::error('Error registering instructor: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return [
                'message' => 'An unexpected error occurred while registering the instructor.',
                'error' => $e->getMessage(),
                'status' => 'error'
            ];
        }
    }

    /**
     * Sanitizes the instructor data from the DTO.
     *
     * @param InstructorDTO $dto
     * @return InstructorDTO
     */
    private function sanitizeInstructorData(InstructorDTO $dto): InstructorDTO
    {
        return new InstructorDTO(
            id: $dto->id,
            name: Str::title(trim(strip_tags($dto->name))),
            phone: preg_replace('/[^0-9]/', '', $dto->phone),
            password: password_hash($dto->password, PASSWORD_DEFAULT),
            birthDate: $dto->birthDate,
            hiring: $dto->hiring,
            cref: $dto->cref,
            crefito: $dto->crefito,
            fulladdress: $dto->fulladdress,
            classification: strtoupper(trim(strip_tags($dto->classification)))
        );
    }

    public function loginInstructor(string $nameuser, string $password): array{
        $responseUser = $this->sqlAdapter->getInstructorByLoginName($nameuser);
        if ($responseUser["status"] == false)
            return ["status"=> false,
                "message"=> "error",
                "error" => "Usuário ou senha inválidos"
            ];

        $userData = $responseUser["data"];
        $isPasswordValid = Hash::check($password, $userData->getAuthPassword());
        if (! $isPasswordValid)
        {
            return ["status"=> false,
            "message"=> "error",
            "error"=> "Usuário ou senha inválidos"
            ];
        }
        // 3. Verificar status
        if ($userData->statususer !== 'Active') {
            return [
                'status' => false,
                'message' => 'error',
                'error' => 'Usuário inativo'
            ];
        }

        // 4. Carregar dados do instrutor
        $instructor = $userData->instructor;

        if (!$instructor) {
            return [
                'status' => false,
                'message' => 'error',
                'error' => 'Dados do instrutor não encontrados',
                'test' => $userData->toArray()
            ];
        }

        $token = JWTAuth::fromUser($userData);

        $payload = JWTAuth::setToken($token)->getPayload();
        // 6. Retornar dados (SEM senha)
        return [
            'status' => true,
            'message' => 'Login realizado com sucesso',
            'data' => [
                'user' => [
                    'id' => $instructor->Id_instructors,
                    'nameuser' => $userData->nameuser,
                    'fullname' => $userData->fullname,
                    'type' => $userData->typeuser,
                    'status' => $userData->statususer,
                ],
                'instructor' => [
                    'cref' => $instructor->cref,
                    'crefito' => $instructor->crefito,
                ],
                'token' => $token, // ✅ Token JWT-like
                'token_type' => 'Bearer'
            ]
        ];
    }

    public function listInstructors(): array
    {
        try {
            $instructors = $this->sqlAdapter->getAllInstructors();

            return [
                'status' => 'success',
                'message' => 'Instrutores encontrados com sucesso',
                'data' => $instructors
            ];
        } catch (Exception $e) {
            Log::error('Error listing instructors: ' . $e->getMessage());
            return [
                'status' => 'error',
                'message' => 'Falha ao listar instrutores'
            ];
        }
    }

    public function getInstructorClasses(int $instructorId): array
    {
        try {
            // Usa o AulasAdapter diretamente
            $classes = $this->aulasAdapter->getInstructorClassesWithStudents($instructorId);

            return [
                'status' => 'success',
                'message' => 'Aulas do instrutor encontradas com sucesso',
                'data' => $classes
            ];
        } catch (Exception $e) {
            Log::error('Error getting instructor classes: ' . $e->getMessage(), [
                'instructor_id' => $instructorId,
                'trace' => $e->getTraceAsString()
            ]);
            return [
                'status' => 'error',
                'message' => 'Falha ao buscar aulas do instrutor',
                'error' => $e->getMessage()
            ];
        }
    }

    public function updateStudentAttendance(int $instructorId, int $studentId, int $classId, string $status): array
    {
        try {
            // Validar status
            $validStatuses = ['pending', 'confirmed', 'completed', 'absent', 'cancelled'];
            if (!in_array($status, $validStatuses)) {
                return [
                    'status' => 'error',
                    'message' => 'Status inválido. Valores aceitos: ' . implode(', ', $validStatuses)
                ];
            }

            // Verifica se a aula pertence ao instrutor
            if (!$this->sqlAdapter->verifyInstructorOwnsClass($instructorId, $classId)) {
                return [
                    'status' => 'error',
                    'message' => 'Aula não encontrada ou não pertence a este instrutor'
                ];
            }

            // Usa o AulasAdapter para atualizar o status
            $updated = $this->aulasAdapter->updateStudentAulaStatus($studentId, $classId, $status);

            if ($updated) {
                return [
                    'status' => 'success',
                    'message' => 'Status de presença atualizado com sucesso'
                ];
            }

            return [
                'status' => 'error',
                'message' => 'Falha ao atualizar status'
            ];

        } catch (Exception $e) {
            Log::error('Error updating student attendance: ' . $e->getMessage(), [
                'instructor_id' => $instructorId,
                'student_id' => $studentId,
                'class_id' => $classId,
                'status' => $status,
                'trace' => $e->getTraceAsString()
            ]);
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }
} 