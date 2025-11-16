<?php

namespace App\Swagger\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "StudiosResponse",
    type: "object",
    title: "Studios Response"
)]
class StudiosResponse
{
    #[OA\Property(property: "status", type: "string", example: "success")]
    public string $status;

    #[OA\Property(property: "message", type: "string", example: "Estúdios encontrados com sucesso")]
    public string $message;

    #[OA\Property(
        property: "data",
        type: "array",
        items: new OA\Items(
            type: "object",
            properties: [
                new OA\Property(property: "id", type: "integer", example: 1),
                new OA\Property(property: "name", type: "string", example: "Unidade São Miguel"),
                new OA\Property(property: "location", type: "string", example: "Rua Example, 123 - São Paulo/SP")
            ]
        )
    )]
    public array $data;
}
