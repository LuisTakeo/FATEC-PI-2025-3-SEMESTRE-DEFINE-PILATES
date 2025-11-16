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

    #[OA\Get(
        path: "/api/aulas",
        operationId: "listAulas",
        tags: ["Aulas"],
        summary: "Listar aulas com filtros opcionais",
        description: "Lista todas as aulas com filtros opcionais por data, estúdio e instrutor"
    )]
    #[OA\Parameter(
        name: "data",
        in: "query",
        description: "Data da aula no formato DD-MM-YYYY (opcional)",
        required: false,
        schema: new OA\Schema(type: "string", example: "16-11-2025")
    )]
    #[OA\Parameter(
        name: "id_studio",
        in: "query",
        description: "ID do estúdio/unidade (opcional)",
        required: false,
        schema: new OA\Schema(type: "integer", example: 1)
    )]
    #[OA\Parameter(
        name: "id_instrutor",
        in: "query",
        description: "ID do instrutor (opcional)",
        required: false,
        schema: new OA\Schema(type: "integer", example: 1)
    )]
    #[OA\Response(
        response: 200,
        description: "Lista de aulas retornada com sucesso",
        content: new OA\JsonContent(ref: "#/components/schemas/AulaListResponse")
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
    public function index(Request $request): JsonResponse
    {
        $data = $request->query('data');
        $id_studio = $request->query('id_studio');
        $id_instrutor = $request->query('id_instrutor');
        
        $result = $this->aulasService->listAulasByDay($data, $id_studio, $id_instrutor);
        $status = $result['status'] === 'success' ? 200 : 500;
        
        return response()->json($result, $status);
    }

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
        content: new OA\JsonContent(ref: "#/components/schemas/AulaTypesResponse")
    )]
    #[OA\Response(
        response: 500,
        description: "Erro ao buscar tipos de aulas",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "status", type: "string", example: "error"),
                new OA\Property(property: "message", type: "string", example: "Failed to list aulas types")
            ]
        )
    )]
    public function listAulasTypes(): JsonResponse
    {
        $result = $this->aulasService->listAulasTypes();
        $status = $result['status'] === 'success' ? 200 : 500;
        
        return response()->json($result, $status);
    }


    #[OA\Get(
        path: "/api/aulas/studios",
        operationId: "listStudios",
        tags: ["Aulas"],
        summary: "Listar todos os estúdios com informações básicas"
    )]
    #[OA\Response(
        response: 200,
        description: "Lista de estúdios retornada com sucesso",
        content: new OA\JsonContent(ref: "#/components/schemas/StudiosResponse")
    )]
    #[OA\Response(
        response: 500,
        description: "Erro ao buscar estúdios",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "status", type: "string", example: "error"),
                new OA\Property(property: "message", type: "string", example: "Failed to list studios")
            ]
        )
    )]
    public function listStudios(): JsonResponse
    {
        $result = $this->aulasService->listStudios();
        $status = $result['status'] === 'success' ? 200 : 500;
        
        return response()->json($result, $status);
    }


    #[OA\Post(
        path: "/api/aulas/cadastro",
        operationId: "registerAula",
        tags: ["Aulas"],
        summary: "Cadastrar nova aula"
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(ref: "#/components/schemas/AulaRegisterRequest")
    )]
    #[OA\Response(
        response: 201,
        description: "Aula cadastrada com sucesso",
        content: new OA\JsonContent(ref: "#/components/schemas/AulaSuccessResponse")
    )]
    #[OA\Response(response: 422, description: "Erro de validação")]
    #[OA\Response(response: 500, description: "Erro interno")]
    public function registerAula(AulaRegisterRequest $request): JsonResponse
    {
        $result = $this->aulasService->registerAula($request->toDTO());
        // return response()->json(["message" => "WIP: Cadastro de aula"]);
        $status = $result['status'] === 'success' ? 201 : 422;
        return response()->json($result, $status);
    }

}
