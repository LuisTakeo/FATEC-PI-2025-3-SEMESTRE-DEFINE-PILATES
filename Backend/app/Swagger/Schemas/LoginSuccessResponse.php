<?php

namespace App\Swagger\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "LoginSuccessResponse",
    type: "object",
    title: "Login Success Response"
)]
class LoginSuccessResponse
{
    #[OA\Property(
        property: "status",
        type: "boolean",
        example: true
    )]
    public bool $status;

    #[OA\Property(
        property: "message",
        type: "string",
        example: "Login realizado com sucesso"
    )]
    public string $message;

    #[OA\Property(
        property: "data",
        type: "object",
        properties: [
            new OA\Property(
                property: "token",
                type: "string",
                description: "Token de autenticação JWT",
                example: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
            ),
            new OA\Property(
                property: "student",
                type: "object",
                properties: [
                    new OA\Property(property: "Id_students", type: "integer", example: 1),
                    new OA\Property(property: "name", type: "string", example: "João Silva"),
                    new OA\Property(property: "phone", type: "string", example: "11951999999"),
                    new OA\Property(property: "cpf", type: "string", example: "12345678901"),
                    new OA\Property(property: "profession", type: "string", example: "Engenheiro"),
                    new OA\Property(property: "birth_date", type: "string", format: "date", example: "15-01-1990")
                ]
            )
        ]
    )]
    public object $data;
}
