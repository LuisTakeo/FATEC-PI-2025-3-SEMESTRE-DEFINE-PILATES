<?php
// Backend/app/Swagger/Schemas/InstructorSuccessResponse.php

namespace App\Swagger\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "InstructorSuccessResponse",
    type: "object",
    title: "Instructor Success Response"
)]
class InstructorSuccessResponse
{
    #[OA\Property(property: "status", type: "string", example: "success")]
    public string $status;

    #[OA\Property(property: "message", type: "string", example: "Instrutor cadastrado com sucesso")]
    public string $message;

    #[OA\Property(
        property: "data",
        type: "object",
        properties: [
            new OA\Property(property: "id", type: "integer", example: 1),
            new OA\Property(property: "name", type: "string", example: "John Doe"),
            new OA\Property(property: "phone", type: "string", example: "11999999999")
        ]
    )]
    public object $data;
}
