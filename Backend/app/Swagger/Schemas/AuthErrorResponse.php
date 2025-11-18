<?php

namespace App\Swagger\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "AuthErrorResponse",
    type: "object",
    description: "Resposta de erro de autenticação"
)]
class AuthErrorResponse
{
    #[OA\Property(property: "status", type: "string", example: "error")]
    public string $status;

    #[OA\Property(property: "message", type: "string", example: "Token inválido ou expirado")]
    public string $message;

    #[OA\Property(property: "error", type: "string", example: "Token has expired", nullable: true)]
    public ?string $error;
}
