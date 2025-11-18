<?php

namespace App\Swagger\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "AuthMeResponse",
    type: "object",
    description: "Resposta com dados do usuário autenticado"
)]
class AuthMeResponse
{
    #[OA\Property(property: "status", type: "string", example: "success")]
    public string $status;

    #[OA\Property(property: "message", type: "string", example: "Usuário autenticado")]
    public string $message;

    #[OA\Property(
        property: "data",
        type: "object",
        properties: [
            new OA\Property(
                property: "user",
                type: "object",
                properties: [
                    new OA\Property(property: "id", type: "integer", example: 1),
                    new OA\Property(property: "nameuser", type: "string", example: "joao.silva"),
                    new OA\Property(property: "fullname", type: "string", example: "João Silva"),
                    new OA\Property(property: "type", type: "string", example: "student"),
                    new OA\Property(property: "status", type: "string", example: "Active")
                ]
            ),
            new OA\Property(
                property: "permissions",
                type: "object",
                properties: [
                    new OA\Property(
                        property: "pages",
                        type: "array",
                        items: new OA\Items(type: "string", example: "dashboard")
                    ),
                    new OA\Property(
                        property: "actions",
                        type: "array",
                        items: new OA\Items(type: "string", example: "view_profile")
                    )
                ]
            ),
            new OA\Property(
                property: "entity",
                type: "object",
                nullable: true,
                properties: [
                    new OA\Property(property: "id", type: "integer", example: 1),
                    new OA\Property(property: "cpf", type: "string", example: "12345678901", nullable: true),
                    new OA\Property(property: "profession", type: "string", example: "Engenheiro", nullable: true),
                    new OA\Property(property: "birth_date", type: "string", example: "1990-01-15", nullable: true)
                ]
            )
        ]
    )]
    public object $data;
}
