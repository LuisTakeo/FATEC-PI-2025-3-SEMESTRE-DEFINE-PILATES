<?php
// Backend/app/Swagger/Schemas/Endereco.php

namespace App\Swagger\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "Endereco",
    type: "object", 
    title: "Address Information",
    required: ["tipo", "rua", "numero", "bairro", "cidade", "estado", "cep"]
)]
class Endereco
{
    #[OA\Property(property: "tipo", type: "string", enum: ["residencial", "comercial", "cobranca"])]
    public string $tipo;

    #[OA\Property(property: "rua", type: "string", maxLength: 255, example: "Rua das Flores")]
    public string $rua;

    #[OA\Property(property: "numero", type: "string", maxLength: 10, example: "123")]
    public string $numero;

    #[OA\Property(property: "complemento", type: "string", maxLength: 100, nullable: true, example: "Apto 45")]
    public ?string $complemento;

    #[OA\Property(property: "bairro", type: "string", maxLength: 100, example: "Centro")]
    public string $bairro;

    #[OA\Property(property: "cidade", type: "string", maxLength: 100, example: "São Paulo")]
    public string $cidade;

    #[OA\Property(property: "estado", type: "string", maxLength: 2, example: "SP")]
    public string $estado;

    #[OA\Property(property: "cep", type: "string", example: "01234-567")]
    public string $cep;

    #[OA\Property(property: "principal", type: "boolean", nullable: true, example: true)]
    public ?bool $principal;
}