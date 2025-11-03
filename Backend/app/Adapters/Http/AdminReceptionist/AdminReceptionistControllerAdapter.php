<?php

namespace App\Adapters\Http\AdminReceptionist;

use App\Application\Ports\AdminReceptionist\AdminReceptionistServiceContract;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

#[OA\Tag(name: "AdminReceptionist", description: "Admin and Receptionist management operations")]
class AdminReceptionistControllerAdapter extends BaseController
{
    public function __construct(private AdminReceptionistServiceContract $adminReceptionistService) {}

    #[OA\Get(
        path: "/api/admin_receptionist",
        operationId: "getAdminReceptionist",
        tags: ["AdminReceptionist"],
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
    public function index(Request $request)
    {
        return response()->json(["message" => "test"]);
    }

    #[OA\Post(
        path: "/api/admin_receptionist/save",
        operationId: "registerAdminReceptionist",
        tags: ["AdminReceptionist"],
        summary: "Cadastro completo de novo administrador ou recepcionista"
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(ref: "#/components/schemas/AdminReceptionistRegisterRequest")
    )]
    #[OA\Response(
        response: 201,
        description: "Sucesso",
        content: new OA\JsonContent(ref: "#/components/schemas/AdminReceptionistSuccessResponse")
    )]
    #[OA\Response(response: 422, description: "Erro de validação")]
    #[OA\Response(response: 500, description: "Erro interno")]
    public function postAdminReceptionist(AdminReceptionistRegisterRequest $request): JsonResponse
    {
        $result = $this->adminReceptionistService->registerAdminReceptionist($request->toDTO());
        $status = $result['status'] === 'success' ? 201 : 422;
        
        return response()->json($result, $status);
    }
}