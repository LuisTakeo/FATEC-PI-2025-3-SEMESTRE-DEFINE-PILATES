<?php

namespace App\Swagger\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "InstructorsListResponse",
    type: "object",
    title: "Instructors List Response"
)]
class InstructorsListResponse
{
    #[OA\Property(property: "status", type: "string", example: "success")]
    public string $status;

    #[OA\Property(property: "message", type: "string", example: "Instrutores encontrados com sucesso")]
    public string $message;

    #[OA\Property(
        property: "data",
        type: "array",
        items: new OA\Items(
            type: "object",
            properties: [
                new OA\Property(property: "id", type: "integer", example: 1),
                new OA\Property(property: "nome", type: "string", example: "João Silva")
            ]
        )
    )]
    public array $data;
}
