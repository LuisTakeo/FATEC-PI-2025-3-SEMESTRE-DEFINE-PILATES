<?php

namespace App\Swagger\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "AvailableAulasResponse",
    type: "object",
    title: "Available Aulas Response"
)]
class AvailableAulasResponse
{
    #[OA\Property(property: "status", type: "string", example: "success")]
    public string $status;

    #[OA\Property(property: "message", type: "string", example: "Aulas disponíveis encontradas com sucesso")]
    public string $message;

    #[OA\Property(
        property: "data",
        type: "array",
        items: new OA\Items(
            type: "object",
            properties: [
                new OA\Property(property: "id", type: "integer", example: 5),
                new OA\Property(property: "horario", type: "string", example: "10:30"),
                new OA\Property(property: "tipo", type: "string", example: "Pilates"),
                new OA\Property(
                    property: "unidade",
                    type: "object",
                    properties: [
                        new OA\Property(property: "id", type: "integer", example: 1),
                        new OA\Property(property: "name", type: "string", example: "Unidade São Miguel"),
                        new OA\Property(property: "location", type: "string", example: "Rua Example, 123")
                    ]
                ),
                new OA\Property(
                    property: "instructor",
                    type: "object",
                    properties: [
                        new OA\Property(property: "id", type: "integer", example: 2),
                        new OA\Property(property: "nome", type: "string", example: "João Silva")
                    ]
                ),
                new OA\Property(property: "data", type: "string", example: "17-11-2025"),
                new OA\Property(property: "inscritos", type: "integer", example: 2, description: "Quantidade de alunos já inscritos na aula"),
                new OA\Property(property: "vagas_disponiveis", type: "integer", example: 1, description: "Quantidade de vagas disponíveis (máximo 3 por aula)")
            ]
        )
    )]
    public array $data;
}
