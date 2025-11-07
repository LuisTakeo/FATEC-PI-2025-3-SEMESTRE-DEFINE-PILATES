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
        operationId: "getInstructors",
        tags: ["Instructors"],
        summary: "Test endpoint"
    )]
    #[OA\Response(
        response: 200,
        description: "Success response",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "message", type: "string", example: "test")
            ]
        )
    )]    
    public function index(Request $request){
        return response()->json(["message" => "test"]);
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

}