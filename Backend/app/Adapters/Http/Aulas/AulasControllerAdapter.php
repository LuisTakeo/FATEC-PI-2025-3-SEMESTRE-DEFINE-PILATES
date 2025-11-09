<?php
// Backend/app/Adapters/Http/StudentControllerAdapter.php

namespace App\Adapters\Http\Aulas;

use App\Application\Ports\Aulas\AulasServiceContract;
use App\Application\Ports\StudentServiceContract;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;
use App\Adapters\Http\Student\StudentRegisterRequest;
use OpenApi\Attributes as OA; // ✅ Attributes ao invés de Annotations

#[OA\Tag(name: "Aulas", description: "Aulas management operations")] // ✅ Apenas tag
class AulasControllerAdapter extends BaseController
{
    public function __construct(
        private AulasServiceContract $aulasService
    ) {}

    // #[OA\Get(
    //     path: "/api/aulas",
    //     operationId: "getAulas",
    //     tags: ["Aulas"],
    //     summary: "Test endpoint"
    // )]
    // #[OA\Response(
    //     response: 200,
    //     description: "Success response",
    //     content: new OA\JsonContent(
    //         properties: [
    //             new OA\Property(property: "message", type: "string", example: "It works INDEX EEEEEEEEE")
    //         ]
    //     )
    // )]
    // public function index(Request $request)
    // {
    //     return $this->studentService->getStudents();
    // }

    // #[OA\Post(
    //     path: "/api/students/save",
    //     operationId: "registerStudent", 
    //     tags: ["Students"],
    //     summary: "Cadastro completo de novo estudante"
    // )]
    // #[OA\RequestBody(
    //     required: true,
    //     content: new OA\JsonContent(ref: "#/components/schemas/StudentRegisterRequest")
    // )]
    // #[OA\Response(
    //     response: 201,
    //     description: "Sucesso",
    //     content: new OA\JsonContent(ref: "#/components/schemas/StudentSuccessResponse")
    // )]
    // #[OA\Response(response: 422, description: "Erro de validação")]
    // #[OA\Response(response: 500, description: "Erro interno")]
    // public function postRequest(StudentRegisterRequest $request): JsonResponse
    // {
    //     $result = $this->studentService->registerStudent($request->toDTO());
    //     $status = $result['status'] === 'success' ? 201 : 422;
        
    //     return response()->json($result, $status);
    // }

    #[OA\Get(
        path: "/api/aulas/types",
        operationId: "listAulasTypes",
        tags: ["Aulas"],
        summary: "Listar todos os tipos de aulas com informações básicas"
    )]
    #[OA\Response(
        response: 200,
        description: "Lista de tipos de aulas retornada com sucesso",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "status", type: "string", example: "success"),
                new OA\Property(
                    property: "data",
                    type: "array",
                    items: new OA\Items(
                        properties: [
                            new OA\Property(property: "id", type: "integer", example: 1),
                            new OA\Property(property: "type", type: "string", example: "Ioga")
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
                new OA\Property(property: "message", type: "string", example: "Failed to list aulas")
            ]
        )
    )]
    public function listAulasTypes(): JsonResponse
    {
        $result = $this->aulasService->listAulasTypes();
        $status = $result['status'] === 'success' ? 200 : 500;
        
        return response()->json($result, $status);
    }

}
