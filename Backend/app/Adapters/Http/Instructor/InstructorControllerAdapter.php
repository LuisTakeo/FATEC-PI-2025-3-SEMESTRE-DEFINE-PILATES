<?php

namespace App\Adapters\Http\Instructor;

use App\Adapters\Http\Instructor\InstructorRegisterRequest;
use Illuminate\Routing\Controller as BaseController;
use App\Application\Ports\Instructor\InstructorServiceContract;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

// #[OA\Info(
//     title: "Define Pilates API",
//     version: "1.0.0",
//     description: "API documentation for Define Pilates management system"
// )]
// #[OA\Server(
//     url: "http://localhost:8000",
//     description: "Development Server"
// )]
// #[OA\Tag(
//     name: "Instructors",
//     description: "Instructors management operations"
// )]

class InstructorControllerAdapter extends BaseController {

    public function __construct(private InstructorServiceContract $instructorService) {}
    
    #[OA\Get(
        path: "/api/instructors",
        operationId: "listInstructors",
        tags: ["Instructors"],
        summary: "Listar todos os instrutores",
        description: "Lista todos os instrutores com ID e nome"
    )]
    #[OA\Response(
        response: 200,
        description: "Lista de instrutores retornada com sucesso",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "status", type: "string", example: "success"),
                new OA\Property(property: "message", type: "string", example: "Instrutores encontrados com sucesso"),
                new OA\Property(
                    property: "data",
                    type: "array",
                    items: new OA\Items(
                        properties: [
                            new OA\Property(property: "id", type: "integer", example: 1),
                            new OA\Property(property: "nome", type: "string", example: "João Silva")
                        ]
                    )
                )
            ]
        )
    )]
    #[OA\Response(
        response: 500,
        description: "Erro ao buscar instrutores",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "status", type: "string", example: "error"),
                new OA\Property(property: "message", type: "string", example: "Falha ao listar instrutores")
            ]
        )
    )]
    public function index(Request $request): JsonResponse
    {
        $result = $this->instructorService->listInstructors();
        $status = $result['status'] === 'success' ? 200 : 500;
        
        return response()->json($result, $status);
    }

    #[OA\Post(
        path: "/api/instructors/save",
        operationId: "registerInstructor",
        summary: "Cadastrar novo instrutor",
        tags: ["Instructors"]
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(ref: "#/components/schemas/InstructorRegisterRequest")
    )]
    #[OA\Response(
        response: 201,
        description: "Instrutor cadastrado com sucesso",
        content: new OA\JsonContent(ref: "#/components/schemas/InstructorSuccessResponse")
    )]
    #[OA\Response(
        response: 422,
        description: "Erro de validação",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "status", type: "string", example: "error"),
                new OA\Property(property: "message", type: "string", example: "Dados inválidos"),
                new OA\Property(
                    property: "errors",
                    type: "object",
                    example: ["phone" => ["O telefone já está cadastrado"]]
                )
            ]
        )
    )]
    public function postInstructor(InstructorRegisterRequest $request): JsonResponse {
        $result = $this->instructorService->registerInstructor($request->toDTO());
        $status = $result['status'] === 'success' ? 201 : 422;
        return response()->json($result, $status);
    }

    #[OA\Post(
        path: "/api/instructors/login",
        operationId: "loginInstructor",
        tags: ["Instructors"],
        summary: "Login de instrutor"
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(ref: "#/components/schemas/LoginRequest")
    )]
    #[OA\Response(
        response: 200,
        description: "Login realizado com sucesso",
        content: new OA\JsonContent(ref: "#/components/schemas/LoginSuccessResponse")
    )]
    #[OA\Response(
        response: 401,
        description: "Credenciais inválidas",
        content: new OA\JsonContent(ref: "#/components/schemas/LoginErrorResponse")
    )]
    public function login(Request $request): JsonResponse
    {
        $result = $this->instructorService->loginInstructor(
            $request->input('login'),
            $request->input('password')
        );
        
        return response()->json($result, $result['status'] ? 200 : 401);
    }

    #[OA\Get(
        path: "/api/instructors/{instructorId}/classes",
        operationId: "getInstructorClasses",
        tags: ["Instructors"],
        summary: "Listar aulas do instrutor com alunos inscritos",
        description: "Retorna todas as aulas do instrutor com a lista de alunos confirmados ou pendentes"
    )]
    #[OA\Parameter(
        name: "instructorId",
        in: "path",
        required: true,
        description: "ID do instrutor",
        schema: new OA\Schema(type: "integer", example: 1)
    )]
    #[OA\Response(
        response: 200,
        description: "Aulas encontradas com sucesso",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "status", type: "string", example: "success"),
                new OA\Property(property: "message", type: "string", example: "Aulas do instrutor encontradas com sucesso"),
                new OA\Property(
                    property: "data",
                    type: "array",
                    items: new OA\Items(
                        properties: [
                            new OA\Property(property: "id_aula", type: "integer", example: 1),
                            new OA\Property(property: "tipo_aula", type: "string", example: "Pilates Mat"),
                            new OA\Property(property: "studio", type: "string", example: "Studio Principal"),
                            new OA\Property(property: "data", type: "string", format: "date", example: "2025-11-26"),
                            new OA\Property(property: "horario", type: "string", format: "time", example: "09:00:00"),
                            new OA\Property(property: "observacao", type: "string", example: "Trazer toalha"),
                            new OA\Property(
                                property: "alunos",
                                type: "array",
                                items: new OA\Items(
                                    properties: [
                                        new OA\Property(property: "nome", type: "string", example: "Maria Silva"),
                                        new OA\Property(property: "status", type: "string", example: "confirmed")
                                    ]
                                )
                            )
                        ]
                    )
                )
            ]
        )
    )]
    #[OA\Response(
        response: 500,
        description: "Erro ao buscar aulas",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "status", type: "string", example: "error"),
                new OA\Property(property: "message", type: "string", example: "Falha ao buscar aulas do instrutor")
            ]
        )
    )]
    public function getClasses(int $instructorId): JsonResponse
    {
        $result = $this->instructorService->getInstructorClasses($instructorId);
        $status = $result['status'] === 'success' ? 200 : 500;
        
        return response()->json($result, $status);
    }

    #[OA\Patch(
        path: "/api/instructors/attendance",
        operationId: "updateStudentAttendance",
        tags: ["Instructors"],
        summary: "Atualizar status de presença/falta do aluno",
        description: "Permite ao instrutor marcar presença, falta ou outros status do aluno em uma aula específica"
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            properties: [
                new OA\Property(
                    property: "instructor_id",
                    type: "integer",
                    description: "ID do instrutor",
                    example: 1
                ),
                new OA\Property(
                    property: "class_id",
                    type: "integer",
                    description: "ID da aula",
                    example: 5
                ),
                new OA\Property(
                    property: "student_id",
                    type: "integer",
                    description: "ID do aluno",
                    example: 3
                ),
                new OA\Property(
                    property: "status",
                    type: "string",
                    description: "Novo status do aluno",
                    enum: ["pending", "confirmed", "completed", "absent", "cancelled"],
                    example: "completed"
                )
            ]
        )
    )]
    #[OA\Response(
        response: 200,
        description: "Status atualizado com sucesso",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "status", type: "string", example: "success"),
                new OA\Property(property: "message", type: "string", example: "Status de presença atualizado com sucesso")
            ]
        )
    )]
    #[OA\Response(
        response: 400,
        description: "Status inválido ou dados incorretos",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "status", type: "string", example: "error"),
                new OA\Property(property: "message", type: "string", example: "Status inválido. Valores aceitos: pending, confirmed, completed, absent, cancelled")
            ]
        )
    )]
    #[OA\Response(
        response: 404,
        description: "Aula não encontrada ou não pertence ao instrutor",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "status", type: "string", example: "error"),
                new OA\Property(property: "message", type: "string", example: "Aula não encontrada ou não pertence a este instrutor")
            ]
        )
    )]
    public function updateAttendance(Request $request): JsonResponse
    {
        $instructorId = $request->input('instructor_id');
        $classId = $request->input('class_id');
        $studentId = $request->input('student_id');
        $status = $request->input('status');
        
        if (!$instructorId || !$classId || !$studentId || !$status) {
            return response()->json([
                'status' => 'error',
                'message' => 'Campos obrigatórios: instructor_id, class_id, student_id, status'
            ], 400);
        }

        $result = $this->instructorService->updateStudentAttendance($instructorId, $studentId, $classId, $status);
        $httpStatus = $result['status'] === 'success' ? 200 : 400;
        
        return response()->json($result, $httpStatus);
    }

}