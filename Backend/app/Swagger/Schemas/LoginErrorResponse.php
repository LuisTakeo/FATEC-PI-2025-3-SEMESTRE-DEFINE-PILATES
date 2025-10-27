<?php

namespace App\Swagger\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "LoginErrorResponse",
    type: "object",
    title: "Login Error Response"
)]
class LoginErrorResponse
{
    #[OA\Property(
        property: "status",
        type: "boolean",
        example: false
    )]
    public bool $status;

    #[OA\Property(
        property: "message",
        type: "string",
        example: "Credenciais inválidas"
    )]
    public string $message;
}
