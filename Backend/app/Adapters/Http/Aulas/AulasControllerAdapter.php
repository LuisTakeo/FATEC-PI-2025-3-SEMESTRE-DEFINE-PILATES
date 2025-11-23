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
        description: "Lista todas as aulas com filtros opcionais por data, estúdio e instrutor. Requer autenticação e permissão de colaborador.",
        security: [["bearerAuth" => []]]
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


    #[OA\Get(
        path: "/api/students/{id_student}/aulas",
        operationId: "listAulasAluno",
        tags: ["Students"],
        summary: "Listar aulas de um aluno específico",
        description: "Lista todas as aulas que um aluno está matriculado"
    )]
    #[OA\Parameter(
        name: "id_student",
        in: "path",
        description: "ID do aluno",
        required: true,
        schema: new OA\Schema(type: "integer", example: 1)
    )]
    #[OA\Response(
        response: 200,
        description: "Lista de aulas do aluno retornada com sucesso",
        content: new OA\JsonContent(ref: "#/components/schemas/AulaListResponse")
    )]
    #[OA\Response(
        response: 500,
        description: "Erro ao buscar aulas do aluno",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "status", type: "string", example: "error"),
                new OA\Property(property: "message", type: "string", example: "Falha ao listar aulas do aluno")
            ]
        )
    )]
    public function listAulasAluno(int $id_student): JsonResponse
    {
        $result = $this->aulasService->listAulasByStudent($id_student);
        $status = $result['status'] === 'success' ? 200 : 500;
        
        return response()->json($result, $status);
    }

    #[OA\Get(
        path: "/api/students/{id_student}/aulas/next",
        operationId: "getNextAulaAluno",
        tags: ["Students"],
        summary: "Obter próxima aula de um aluno",
        description: "Retorna a próxima aula agendada para o aluno (considerando data e horário atual)"
    )]
    #[OA\Parameter(
        name: "id_student",
        in: "path",
        description: "ID do aluno",
        required: true,
        schema: new OA\Schema(type: "integer", example: 1)
    )]
    #[OA\Response(
        response: 200,
        description: "Próxima aula retornada com sucesso ou null se não houver",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "status", type: "string", example: "success"),
                new OA\Property(property: "message", type: "string", example: "Next aula retrieved successfully"),
                new OA\Property(
                    property: "data",
                    type: "object",
                    nullable: true,
                    properties: [
                        new OA\Property(property: "id", type: "integer", example: 5),
                        new OA\Property(property: "horario", type: "string", example: "14:00"),
                        new OA\Property(property: "tipo", type: "string", example: "Pilates Reformer"),
                        new OA\Property(
                            property: "unidade",
                            type: "object",
                            properties: [
                                new OA\Property(property: "id", type: "integer", example: 1),
                                new OA\Property(property: "name", type: "string", example: "Studio Centro"),
                                new OA\Property(property: "endereco", type: "string", example: "Rua Central, 123")
                            ]
                        ),
                        new OA\Property(
                            property: "instructor",
                            type: "object",
                            properties: [
                                new OA\Property(property: "id", type: "integer", example: 2),
                                new OA\Property(property: "nome", type: "string", example: "Maria Silva")
                            ]
                        ),
                        new OA\Property(property: "data", type: "string", example: "25-11-2025")
                    ]
                )
            ]
        )
    )]
    #[OA\Response(
        response: 500,
        description: "Erro ao buscar próxima aula",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "status", type: "string", example: "error"),
                new OA\Property(property: "message", type: "string", example: "Failed to retrieve next aula")
            ]
        )
    )]
    public function getNextAulaAluno(int $id_student): JsonResponse
    {
        $result = $this->aulasService->getNextAulaByStudent($id_student);
        $status = $result['status'] === 'success' ? 200 : 500;
        
        return response()->json($result, $status);
    }

    #[OA\Post(
        path: "/api/students/aulas/{id_aula}/enroll",
        operationId: "enrollStudentInAula",
        tags: ["Students"],
        summary: "Cadastrar aluno em uma aula",
        description: "Inscreve um aluno em uma aula específica. Limite máximo: 3 alunos por aula."
    )]
    #[OA\Parameter(
        name: "id_aula",
        in: "path",
        description: "ID da aula",
        required: true,
        schema: new OA\Schema(type: "integer", example: 1)
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ["id_student"],
            properties: [
                new OA\Property(property: "id_student", type: "integer", example: 1, description: "ID do aluno")
            ]
        )
    )]
    #[OA\Response(
        response: 201,
        description: "Aluno cadastrado na aula com sucesso",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "status", type: "string", example: "success"),
                new OA\Property(property: "message", type: "string", example: "Aluno cadastrado na aula com sucesso"),
                new OA\Property(
                    property: "data",
                    type: "object",
                    properties: [
                        new OA\Property(property: "id_student", type: "integer", example: 1),
                        new OA\Property(property: "id_aula", type: "integer", example: 1)
                    ]
                )
            ]
        )
    )]
    #[OA\Response(
        response: 422,
        description: "Erro de validação ou regra de negócio",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "status", type: "string", example: "error"),
                new OA\Property(
                    property: "message", 
                    type: "string", 
                    example: "Aula já está com a capacidade máxima de alunos (3 alunos)",
                    description: "Possíveis erros: 'Aluno já está cadastrado nesta aula', 'Aula já está com a capacidade máxima de alunos (3 alunos)', 'Aula não encontrada'"
                )
            ]
        )
    )]
    #[OA\Response(response: 500, description: "Erro interno")]
    public function enrollStudentInAula(int $id_aula, StudentAulaRegisterRequest $request): JsonResponse
    {
        $result = $this->aulasService->enrollStudentInAula($request->validated()['id_student'], $id_aula);
        $status = $result['status'] === 'success' ? 201 : 422;
        
        return response()->json($result, $status);
    }

    #[OA\Patch(
        path: "/api/students/{id_student}/aulas/{id_aula}/status",
        operationId: "updateStudentAulaStatus",
        tags: ["Students"],
        summary: "Atualizar status da inscrição do aluno em uma aula",
        description: "Permite cancelar ou confirmar a presença do aluno em uma aula específica"
    )]
    #[OA\Parameter(
        name: "id_student",
        in: "path",
        description: "ID do aluno",
        required: true,
        schema: new OA\Schema(type: "integer", example: 1)
    )]
    #[OA\Parameter(
        name: "id_aula",
        in: "path",
        description: "ID da aula",
        required: true,
        schema: new OA\Schema(type: "integer", example: 5)
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ["action"],
            properties: [
                new OA\Property(
                    property: "action",
                    type: "string",
                    enum: ["cancel", "confirm"],
                    example: "confirm",
                    description: "Ação a ser executada: 'cancel' para cancelar ou 'confirm' para confirmar presença"
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
                new OA\Property(property: "message", type: "string", example: "Inscrição confirmada com sucesso"),
                new OA\Property(
                    property: "data",
                    type: "object",
                    properties: [
                        new OA\Property(property: "id_student", type: "integer", example: 1),
                        new OA\Property(property: "id_aula", type: "integer", example: 5),
                        new OA\Property(property: "action", type: "string", example: "confirm"),
                        new OA\Property(property: "new_status", type: "string", example: "confirmed")
                    ]
                )
            ]
        )
    )]
    #[OA\Response(
        response: 422,
        description: "Erro de validação ou regra de negócio",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "status", type: "string", example: "error"),
                new OA\Property(
                    property: "message",
                    type: "string",
                    example: "Inscrição não encontrada"
                )
            ]
        )
    )]
    #[OA\Response(response: 500, description: "Erro interno")]
    public function updateStudentAulaStatus(int $id_student, int $id_aula, Request $request): JsonResponse
    {
        $action = $request->input('action');
        
        if (!in_array($action, ['cancel', 'confirm'])) {
            return response()->json([
                'status' => 'error',
                'message' => 'Ação inválida. Use: cancel ou confirm'
            ], 422);
        }

        $result = $this->aulasService->updateStudentAulaStatus($id_student, $id_aula, $action);
        $status = $result['status'] === 'success' ? 200 : 422;
        
        return response()->json($result, $status);
    }

    #[OA\Get(
        path: "/api/students/{id_student}/aulas/available",
        operationId: "listAvailableAulasForStudent",
        tags: ["Students"],
        summary: "Listar aulas disponíveis para um aluno",
        description: "Lista aulas futuras (a partir de amanhã) onde o aluno ainda não está cadastrado e que possuem vagas disponíveis"
    )]
    #[OA\Parameter(
        name: "id_student",
        in: "path",
        description: "ID do aluno",
        required: true,
        schema: new OA\Schema(type: "integer", example: 1)
    )]
    #[OA\Response(
        response: 200,
        description: "Lista de aulas disponíveis retornada com sucesso",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "status", type: "string", example: "success"),
                new OA\Property(property: "message", type: "string", example: "Aulas disponíveis encontradas com sucesso"),
                new OA\Property(
                    property: "data",
                    type: "array",
                    items: new OA\Items(
                        properties: [
                            new OA\Property(property: "id", type: "integer", example: 5),
                            new OA\Property(property: "horario", type: "string", example: "10:30"),
                            new OA\Property(property: "tipo", type: "string", example: "Pilates"),
                            new OA\Property(
                                property: "unidade",
                                type: "object",
                                properties: [
                                    new OA\Property(property: "id", type: "integer", example: 1),
                                    new OA\Property(property: "name", type: "string", example: "Unidade São Miguel"),
                                    new OA\Property(property: "location", type: "string", example: "Rua Example, 123")
                                ]
                            ),
                            new OA\Property(
                                property: "instructor",
                                type: "object",
                                properties: [
                                    new OA\Property(property: "id", type: "integer", example: 2),
                                    new OA\Property(property: "nome", type: "string", example: "João Silva")
                                ]
                            ),
                            new OA\Property(property: "data", type: "string", example: "17-11-2025"),
                            new OA\Property(property: "inscritos", type: "integer", example: 2, description: "Quantidade de alunos já inscritos"),
                            new OA\Property(property: "vagas_disponiveis", type: "integer", example: 1, description: "Quantidade de vagas disponíveis")
                        ]
                    )
                )
            ]
        )
    )]
    #[OA\Response(
        response: 500,
        description: "Erro ao buscar aulas disponíveis",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "status", type: "string", example: "error"),
                new OA\Property(property: "message", type: "string", example: "Falha ao listar aulas disponíveis")
            ]
        )
    )]
    public function listAvailableAulasForStudent(int $id_student): JsonResponse
    {
        $result = $this->aulasService->listAvailableAulasForStudent($id_student);
        $status = $result['status'] === 'success' ? 200 : 500;
        
        return response()->json($result, $status);
    }
}
