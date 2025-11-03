<?php
// Backend/app/Swagger/Schemas/InstructorRegisterRequest.php

namespace App\Swagger\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "InstructorRegisterRequest",
    type: "object",
    title: "Instructor Register Request",
    description: "Request body for instructor registration",
    required: ["name", "phone", "password", "birth_date"]
)]
class InstructorRegisterRequest 
{
    #[OA\Property(
        property: "name",
        description: "Nome completo do instrutor",
        type: "string",
        maxLength: 255,
        example: "John Doe"
    )]
    public string $name;

    #[OA\Property(
        property: "phone", 
        description: "Telefone principal (usado como login)",
        type: "string",
        example: "11999999999"
    )]
    public string $phone;

    #[OA\Property(
        property: "password",
        description: "Senha de acesso (mínimo 6 caracteres)", 
        type: "string",
        minLength: 6,
        example: "abc123A"
    )]
    public string $password;

    #[OA\Property(
        property: "birth_date",
        description: "Data de nascimento (formato: YYYY-MM-DD)",
        type: "string",
        format: "date",
        example: "1990-01-15"
    )]
    public string $birth_date;

    #[OA\Property(
        property: "hiring",
        description: "Data de contratação (formato: YYYY-MM-DD)",
        type: "string",
        format: "date",
        example: "2020-01-15"
    )]
    public ?string $hiring;

    #[OA\Property(
        property: "classification",
        description: "Classificação profissional do instrutor",
        type: "string",
        example: "Senior"
    )]
    public ?string $classification;

    #[OA\Property(
        property: "cref",
        description: "Número do registro CREF (Conselho Regional de Educação Física)",
        type: "string",
        example: "12345-G/SP"
    )]
    public ?string $cref;

    #[OA\Property(
        property: "crefito",
        description: "Número do registro CREFITO (Conselho Regional de Fisioterapia e Terapia Ocupacional)",
        type: "string",
        example: "3/12345-F"
    )]
    public ?string $crefito;
}
