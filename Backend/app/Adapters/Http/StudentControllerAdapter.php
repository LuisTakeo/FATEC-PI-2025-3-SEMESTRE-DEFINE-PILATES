<?php
// Backend/app/Adapters/Http/StudentControllerAdapter.php

namespace App\Adapters\Http;

use App\Application\Ports\StudentServiceContract;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;
use App\Adapters\Http\StudentRegisterRequest;
use OpenApi\Attributes as OA; // ✅ Attributes ao invés de Annotations

#[OA\Info(
    title: "Define Pilates API",
    version: "1.0.0",
    description: "API documentation for Define Pilates management system"
)]
#[OA\Server(
    url: "http://localhost:8000",
    description: "Development Server"
)]
#[OA\Tag(
    name: "Students",
    description: "Student management operations"
)]
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
        summary: "Cadastro de novo estudante"
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "name", type: "string", example: "John Doe"),
                new OA\Property(property: "phone", type: "string", example: "11999999999"),
                new OA\Property(property: "password", type: "string", example: "abc123A"),
                new OA\Property(property: "cpf", type: "string", example: "12345678901"),
                new OA\Property(property: "profession", type: "string", example: "Professor"),
                new OA\Property(property: "birth_date", type: "string", example: "15-01-1990")
            ]
        )
    )]
    #[OA\Response(
        response: 201,
        description: "Success",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "status", type: "string", example: "success")
            ]
        )
    )]
    public function postRequest(StudentRegisterRequest $request): JsonResponse
    {
        $result = $this->studentService->registerStudent($request->toDTO());
        $status = $result['status'] === 'success' ? 201 : 422;
        
        return response()->json($result, $status);
    }
}
