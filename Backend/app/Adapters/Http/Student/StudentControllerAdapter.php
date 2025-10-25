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
        return response()->json(["message" => "It works INDEX EEEEEEEEE"]);
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

    #[OA\Post(
    path: "/api/students/login",
    operationId: "loginStudent",
    tags: ["Students"],
    summary: "Login de estudante"
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ["nameuser", "password"],
            properties: [
                new OA\Property(property: "nameuser", type: "string", example: "11951999999"),
                new OA\Property(property: "password", type: "string", example: "abc123A")
            ]
        )
    )]
    public function login(Request $request): JsonResponse
    {
        $result = $this->studentService->loginStudent(
            $request->input('nameuser'),
            $request->input('password')
        );
        
        return response()->json($result, $result['status'] ? 200 : 401);
    }
}
