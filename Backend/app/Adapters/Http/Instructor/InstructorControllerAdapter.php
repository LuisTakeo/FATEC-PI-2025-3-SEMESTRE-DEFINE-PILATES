<?php

namespace App\Adapters\Http\Instructor;

use App\Adapters\Http\Instructor\InstructorRegisterRequest;
use Illuminate\Routing\Controller as BaseController;
use App\Application\Ports\Instructor\InstructorServiceContract;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

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
    name: "Instructors",
    description: "Instructors management operations"
)]

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
        tags: ["Instructors"],
        summary: "Cadastro de novo instrutor"
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "name", type: "string", example: "John Doe"),
                new OA\Property(property: "phone", type: "string", example: "11999999999"),
                new OA\Property(property: "password", type: "string", example: "abc123A"),
                new OA\Property(property: "hiring", type: "string", example: "15-01-1990"),
                new OA\Property(property: "birth_date", type: "string", example: "15-01-1990"),
                new OA\Property(property: "classification", type: "string", example: "abc123A"),
                new OA\Property(property: "cref", type: "string", example: "12345-G/SP"),
                new OA\Property(property: "crefito", type: "string", example: "3/12345-F"),
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
    public function postInstructor(InstructorRegisterRequest $request): JsonResponse {
        $result = $this->instructorService->registerInstructor($request->toDTO());
        $status = $result['status'] === 'success' ? 201 : 422;
        return response()->json($result, $status);
    }

}