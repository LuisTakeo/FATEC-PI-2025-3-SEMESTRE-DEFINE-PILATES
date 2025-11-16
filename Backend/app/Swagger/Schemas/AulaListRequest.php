<?php

namespace App\Swagger\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "AulaListRequest",
    type: "object",
    title: "Aula List Request",
    description: "Parâmetros opcionais para filtrar a listagem de aulas"
)]
class AulaListRequest
{
    #[OA\Property(
        property: "data",
        type: "string",
        example: "16-11-2025",
        description: "Data da aula no formato DD-MM-YYYY (opcional)"
    )]
    public ?string $data;

    #[OA\Property(
        property: "id_studio",
        type: "integer",
        example: 1,
        description: "ID do estúdio/unidade (opcional)"
    )]
    public ?int $id_studio;

    #[OA\Property(
        property: "id_instrutor",
        type: "integer",
        example: 1,
        description: "ID do instrutor (opcional)"
    )]
    public ?int $id_instrutor;
}
