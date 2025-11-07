<?php
// Backend/app/Adapters/Http/StudentControllerAdapter.php

namespace App\Adapters\Http\Student;

use App\Application\Ports\StudentServiceContract;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;
use App\Adapters\Http\Student\StudentRegisterRequest;
use OpenApi\Attributes as OA; // ✅ Attributes ao invés de Annotations

#[OA\Tag(name: "Students", description: "Student management operations")] // ✅ Apenas tag
class StudentControllerAdapter extends BaseController
{
    public function __construct(
        private StudentServiceContract $studentService
    ) {}

    #[OA\Get(
        path: "/api/students",
        operationId: "getStudents",
        tags: ["Students"],
        summary: "Test endpoint"
    )]
    #[OA\Response(
        response: 200,
        description: "Success response",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "message", type: "string", example: "It works INDEX EEEEEEEEE")
            ]
        )
    )]
    public function index(Request $request)
    {
        return $this->studentService->getStudents();
    }

    #[OA\Post(
        path: "/api/students/save",
        operationId: "registerStudent", 
        tags: ["Students"],
        summary: "Cadastro completo de novo estudante"
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(ref: "#/components/schemas/StudentRegisterRequest")
    )]
    #[OA\Response(
        response: 201,
        description: "Sucesso",
        content: new OA\JsonContent(ref: "#/components/schemas/StudentSuccessResponse")
    )]
    #[OA\Response(response: 422, description: "Erro de validação")]
    #[OA\Response(response: 500, description: "Erro interno")]
    public function postRequest(StudentRegisterRequest $request): JsonResponse
    {
        $result = $this->studentService->registerStudent($request->toDTO());
        $status = $result['status'] === 'success' ? 201 : 422;
        
        return response()->json($result, $status);
    }

    #[OA\Get(
        path: "/api/students/list",
        operationId: "listStudents",
        tags: ["Students"],
        summary: "Listar todos os estudantes com informações básicas"
    )]
    #[OA\Response(
        response: 200,
        description: "Lista de estudantes retornada com sucesso",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "status", type: "string", example: "success"),
                new OA\Property(
                    property: "data",
                    type: "array",
                    items: new OA\Items(
                        properties: [
                            new OA\Property(property: "id", type: "integer", example: 1),
                            new OA\Property(property: "fullname", type: "string", example: "João Silva"),
                            new OA\Property(property: "phone", type: "string", example: "11999999999"),
                            new OA\Property(property: "typeuser", type: "string", example: "student"),
                            new OA\Property(property: "birth_date", type: "string", nullable: true, example: "1990-01-15"),
                            new OA\Property(property: "cpf", type: "string", nullable: true, example: "12345678901"),
                            new OA\Property(property: "profession", type: "string", nullable: true, example: "Engenheiro")
                        ]
                    )
                )
            ]
        )
    )]
    #[OA\Response(
        response: 500,
        description: "Erro ao buscar estudantes",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "status", type: "string", example: "error"),
                new OA\Property(property: "message", type: "string", example: "Failed to list students")
            ]
        )
    )]
    public function listStudents(): JsonResponse
    {
        $result = $this->studentService->listStudents();
        $status = $result['status'] === 'success' ? 200 : 500;
        
        return response()->json($result, $status);
    }

    #[OA\Post(
        path: "/api/students/login",
        operationId: "loginStudent",
        tags: ["Students"],
        summary: "Login de estudante"
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
        $result = $this->studentService->loginStudent(
            $request->input('login'),
            $request->input('password')
        );
        
        return response()->json($result, $result['status'] ? 200 : 401);
    }
}
