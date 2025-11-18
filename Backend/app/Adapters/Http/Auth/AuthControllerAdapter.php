<?php

namespace App\Adapters\Http\Auth;

use App\Application\Ports\Auth\AuthServiceContract;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;
use OpenApi\Attributes as OA;

#[OA\Tag(name: "Authentication", description: "JWT Authentication endpoints")]
class AuthControllerAdapter extends BaseController
{
    public function __construct(
        private AuthServiceContract $authService
    ) {}

    #[OA\Get(
        path: "/api/auth/me",
        operationId: "getCurrentUser",
        tags: ["Authentication"],
        summary: "Retorna dados do usuário autenticado",
        security: [["bearerAuth" => []]]
    )]
    #[OA\Response(
        response: 200,
        description: "Usuário autenticado retornado com sucesso",
        content: new OA\JsonContent(ref: "#/components/schemas/AuthMeResponse")
    )]
    #[OA\Response(
        response: 401,
        description: "Token inválido ou expirado",
        content: new OA\JsonContent(ref: "#/components/schemas/AuthErrorResponse")
    )]
    public function me(): JsonResponse
    {
        $result = $this->authService->getCurrentUser();
        $status = $result['status'] === 'success' ? 200 : 401;
        
        return response()->json($result, $status);
    }

    #[OA\Post(
        path: "/api/auth/logout",
        operationId: "logout",
        tags: ["Authentication"],
        summary: "Faz logout do usuário (invalida o token atual)",
        security: [["bearerAuth" => []]]
    )]
    #[OA\Response(
        response: 200,
        description: "Logout realizado com sucesso",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "status", type: "string", example: "success"),
                new OA\Property(property: "message", type: "string", example: "Logout realizado com sucesso")
            ]
        )
    )]
    #[OA\Response(
        response: 401,
        description: "Token inválido",
        content: new OA\JsonContent(ref: "#/components/schemas/AuthErrorResponse")
    )]
    public function logout(): JsonResponse
    {
        $result = $this->authService->logout();
        $status = $result['status'] === 'success' ? 200 : 500;
        
        return response()->json($result, $status);
    }

    #[OA\Post(
        path: "/api/auth/refresh",
        operationId: "refreshToken",
        tags: ["Authentication"],
        summary: "Renova o token JWT do usuário",
        security: [["bearerAuth" => []]]
    )]
    #[OA\Response(
        response: 200,
        description: "Token renovado com sucesso",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "status", type: "string", example: "success"),
                new OA\Property(property: "message", type: "string", example: "Token renovado com sucesso"),
                new OA\Property(
                    property: "data",
                    properties: [
                        new OA\Property(property: "token", type: "string", example: "eyJ0eXAiOiJKV1QiLCJhbGc..."),
                        new OA\Property(property: "token_type", type: "string", example: "Bearer")
                    ],
                    type: "object"
                )
            ]
        )
    )]
    #[OA\Response(
        response: 401,
        description: "Token inválido ou expirado",
        content: new OA\JsonContent(ref: "#/components/schemas/AuthErrorResponse")
    )]
    public function refresh(): JsonResponse
    {
        $result = $this->authService->refreshToken();
        $status = $result['status'] === 'success' ? 200 : 401;
        
        return response()->json($result, $status);
    }
}
