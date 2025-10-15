<?php
// Backend/app/Swagger/Schemas/StudentSuccessResponse.php

namespace App\Swagger\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "StudentSuccessResponse",
    type: "object",
    title: "Success Response"
)]
class StudentSuccessResponse
{
    #[OA\Property(property: "status", type: "string", example: "success")]
    public string $status;

    #[OA\Property(property: "message", type: "string", example: "Student registered successfully")]
    public string $message;

    #[OA\Property(
        property: "data",
        type: "object",
        properties: [
            new OA\Property(property: "id", type: "integer", example: 1),
            new OA\Property(property: "name", type: "string", example: "João Silva"),
            new OA\Property(property: "phone", type: "string", example: "(11)99999-9999"),
            new OA\Property(property: "has_photos", type: "boolean", example: true),
            new OA\Property(property: "has_additional_data", type: "boolean", example: true)
        ]
    )]
    public object $data;
}