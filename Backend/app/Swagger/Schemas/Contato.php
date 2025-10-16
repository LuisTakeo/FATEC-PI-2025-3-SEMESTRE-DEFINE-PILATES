<?php
// Backend/app/Swagger/Schemas/Contato.php

namespace App\Swagger\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "Contato",
    type: "object",
    title: "Contact Information",
    required: ["tipo", "valor"]
)]
class Contato
{
    #[OA\Property(
        property: "tipo",
        type: "string", 
        enum: ["telefone", "email", "whatsapp", "emergencia"],
        example: "email"
    )]
    public string $tipo;

    #[OA\Property(
        property: "valor",
        type: "string",
        maxLength: 255,
        example: "joao@email.com"
    )]
    public string $valor;

    #[OA\Property(
        property: "observacao",
        type: "string", 
        maxLength: 500,
        nullable: true,
        example: "Email pessoal"
    )]
    public ?string $observacao;
}