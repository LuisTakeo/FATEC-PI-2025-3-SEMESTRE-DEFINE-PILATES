<?php

namespace App\Swagger\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "AdminReceptionistSuccessResponse",
    type: "object",
    title: "Admin/Receptionist Success Response"
)]
class AdminReceptionistSuccessResponse
{
    #[OA\Property(property: "status", type: "string", example: "success")]
    public string $status;

    #[OA\Property(property: "message", type: "string", example: "Admin/Receptionist registered successfully")]
    public string $message;

    #[OA\Property(
        property: "data",
        type: "object",
        properties: [
            new OA\Property(property: "id", type: "integer", example: 1),
            new OA\Property(property: "name", type: "string", example: "Maria Santos"),
            new OA\Property(property: "phone", type: "string", example: "(11)98765-4321"),
            new OA\Property(property: "typecollaborator", type: "string", example: "Administrator"),
            new OA\Property(property: "classification", type: "string", example: "A")
        ]
    )]
    public object $data;
}
