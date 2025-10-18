<?php

namespace App\Adapters\Http\AdminReceptionist;

use App\Application\Ports\AdminReceptionist\AdminReceptionistServiceContract;
use Illuminate\Routing\Controller as BaseController;
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
    name: "AdminRecepctionist",
    description: "Admin and Receptionist management operations, some of them are avaliable only for admins"
)]
class AdminReceptionistControllerAdapter extends BaseController {

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
                //new OA\Property(property: "name", type: "string", example: "John Doe"),
                new OA\Property(property: "phone", type: "string", example: "11999999999"),
                new OA\Property(property: "password", type: "string", example: "abc123A"),
                new OA\Property(property: "typecollaborator", type: "string", example: "Recepcionista"),
                new OA\Property(property: "birth_date", type: "string", example: "15-01-1990"),
                new OA\Property(property: "fulladdress", type: "string", example: "Rua XV de Novembro, 745, Centro, Curitiba - PR"),
                new OA\Property(property: "hiring", type: "string", example: "15-01-1990"),
                new OA\Property(property: "classification", type: "string", example: "abc123A"),
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
    public function postAdminReceptionist(AdminReceptionistRegisterRequest $request): JsonResponse {
        $result = $this->adminReceptionistService->registerAdminReceptionist($request->toDTO());
        $status = $result['status'] === 'success' ? 201 : 422;
        return response()->json($result, $status);
    
    }
}