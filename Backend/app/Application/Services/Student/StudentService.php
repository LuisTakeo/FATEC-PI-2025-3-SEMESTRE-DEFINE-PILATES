<?php

namespace App\Application\Services\Student;


use App\Application\DTOs\StudentDTO;
use App\Application\Ports\NoSQLPort;
use App\Application\Ports\StudentNoSQLPort;
use App\Application\Ports\StudentRepositoryPort;
use App\Application\Ports\StudentServiceContract;
use Exception;
use Hash;
use Str;

class StudentService implements StudentServiceContract
{
    private StudentRepositoryPort $sqlAdapter;
    private StudentNoSQLPort $noSQLAdapter;

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
        StudentNoSQLPort $noSQLAdapter)
    {
        $this->sqlAdapter = $sqlAdapter;
        $this->noSQLAdapter = $noSQLAdapter;
    }

    // Example method (adjust/remove):
    public function example(array $input): array
    {
        return ['ok' => true];
    }

    public function loginStudent(string $nameuser, string $password){
        $responseUser = $this->sqlAdapter->getStudentByLoginName($nameuser);
        if ($responseUser["status"] == false)
            return ["status"=> false,
                "message"=> "error",
                "error" => "Usuário não cadastrado no sistema"
            ];
        
        $userData = $responseUser["data"];
        $isPasswordValid = Hash::check($password, $userData["passworduser"]);
        if (! $isPasswordValid)
        {
            return ["status"=> false,
            "message"=> "error",
            "error"=> "Usuário ou senha inválidos"
            ];
        }
        return ["status"=> true,
        "message"=> "Usuário logado!"
        ];
    }

    public function registerStudent(StudentDTO $studentDTO): array
    {
        try {
            // 1. Salvar dados básicos no MySQL
            $sqlResult = $this->sqlAdapter->create($studentDTO);
            
            if (!($sqlResult['status'] ?? false)) {
                return [
                    'message' => 'Não foi possível cadastrar o aluno',
                    'error' => 'Falha ao salvar no banco principal',
                    'status' => 'error'
                ];
            }

            // 2. Criar DTO com ID para salvar no MongoDB
            $studentWithId = new StudentDTO(
                name: $studentDTO->name,
                phone: $studentDTO->phone,
                password: $studentDTO->password,
                cpf: $studentDTO->cpf,
                profession: $studentDTO->profession,
                birthDate: $studentDTO->birthDate,
                fotos: $studentDTO->fotos,
                contatos: $studentDTO->contatos,
                enderecos: $studentDTO->enderecos,
                id: $sqlResult['id'] // ID retornado do MySQL
            );

            // 3. Salvar dados extras no MongoDB (não crítico)
            $mongoResult = $this->noSQLAdapter->saveStudentData($studentWithId);
            
            // Log se MongoDB falhou, mas não falha o registro
            if ($mongoResult['status'] !== StudentNoSQLPort::SUCCESS) {
                \Log::warning('MongoDB save failed but student was created', [
                    'student_id' => $sqlResult['id'],
                    'mongo_error' => $mongoResult['error'] ?? 'Unknown error'
                ]);
            }

            return [
                'message' => 'Aluno cadastrado com sucesso!',
                'data' => array_merge($studentDTO->withoutPassword(), [
                    'id' => $sqlResult['id'],
                    'mongo_saved' => $mongoResult['status'] === StudentNoSQLPort::SUCCESS
                ]),
                'status' => 'success'
            ];

        } catch (Exception $e) {
            \Log::error('Failed to register student', [
                'error' => $e->getMessage(),
                'student_data' => $studentDTO->withoutPassword()
            ]);

            return [
                'message' => 'Erro interno do servidor',
                'error' => $e->getMessage(),
                'status' => 'error'
            ];
        }
    }
}
