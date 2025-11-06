<?php

namespace App\Swagger\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "LoginRequest",
    type: "object",
    required: ["nameuser", "password"],
    title: "Login Request"
)]
class LoginRequest
{
    #[OA\Property(
        property: "login",
        type: "string",
        description: "Nome de usuário (Telefone)",
        example: "11951999999"
    )]
    public string $nameuser;

    #[OA\Property(
        property: "password",
        type: "string",
        description: "Senha do usuário",
        example: "abc123A",
        format: "password"
    )]
    public string $password;
}
