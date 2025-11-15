<?php
// Backend/app/Swagger/Schemas/InstructorSuccessResponse.php

namespace App\Swagger\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "AulaSuccessResponse",
    type: "object",
    title: "Aula Success Response"
)]
class AulaSuccessResponse
{
    #[OA\Property(property: "status", type: "string", example: "success")]
    public string $status;

    #[OA\Property(property: "message", type: "string", example: "Aula cadastrada com sucesso")]
    public string $message;

    #[OA\Property(
        property: "data",
        type: "object",
        properties: [
            new OA\Property(property: "id", type: "integer", example: 1),
            new OA\Property(property: "horario", type: "string", example: "10:30"),
            new OA\Property(property: "data", type: "string", example: "15-01-1990"),
            new OA\Property(property: "instrutor", type: "string", example: "John Doe")
        ]
    )]
    public object $data;
}
