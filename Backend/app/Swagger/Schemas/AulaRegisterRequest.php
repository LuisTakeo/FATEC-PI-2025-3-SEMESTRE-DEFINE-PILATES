<?php
// Backend/app/Swagger/Schemas/InstructorRegisterRequest.php

namespace App\Swagger\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "AulaRegisterRequest",
    type: "object",
    title: "Aula Register Request",
    description: "Request body for aula registration",
    required: ["id_tipo_aula", "id_instrutor", "id_studio", "data", "horario",]
)]
class AulaRegisterRequest 
{
    #[OA\Property(
        property: "id_tipo_aula",
        description: "ID do tipo de aula",
        type: "number",
        example: 1
    )]
    public int $id_tipo_aula;

    #[OA\Property(
        property: "id_instrutor",
        description: "ID do instrutor",
        type: "number",
        example: 1
    )]
    public int $id_instrutor;

    #[OA\Property(
        property: "id_studio",
        description: "ID do studio",
        type: "number",
        example: 1
    )]
    public int $id_studio;

    #[OA\Property(
        property: "data",
        description: "Data da aula (formato: DD-MM-YYYY)",
        type: "string",
        format: "date",
        example: "15-01-1990"
    )]
    public string $data;

    #[OA\Property(
        property: "horario",
        description: "Horário da aula (formato: HH:MM)",
        type: "string",
        format: "date",
        example: "10:30"
    )]
    public string $horario;
}
