<?php
// Backend/app/Swagger/Schemas/InstructorRegisterRequest.php

namespace App\Swagger\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "InstructorRegisterRequest",
    type: "object",
    title: "Instructor Register Request",
    description: "Request body for instructor registration",
    required: ["name", "phone", "password", "birth_date", "hiring", "classification", "fulladdress"]
)]
class InstructorRegisterRequest 
{
    #[OA\Property(
        property: "name",
        description: "Nome completo do instrutor",
        type: "string",
        maxLength: 255,
        example: "João Silva"
    )]
    public string $name;

    #[OA\Property(
        property: "phone", 
        description: "Telefone celular (formato: 11999999999 ou (11)99999-9999)",
        type: "string",
        pattern: "^(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$",
        example: "11999999999"
    )]
    public string $phone;

    #[OA\Property(
        property: "password",
        description: "Senha de acesso", 
        type: "string",
        example: "senhaSegura123"
    )]
    public string $password;

    #[OA\Property(
        property: "birth_date",
        description: "Data de nascimento (formato: DD-MM-YYYY)",
        type: "string",
        format: "date",
        example: "15-01-1990"
    )]
    public string $birth_date;

    #[OA\Property(
        property: "hiring",
        description: "Data de contratação (formato: DD-MM-YYYY)",
        type: "string",
        format: "date",
        example: "15-01-2020"
    )]
    public string $hiring;

    #[OA\Property(
        property: "classification",
        description: "Classificação profissional do instrutor (máx 1 caractere, apenas letras)",
        type: "string",
        maxLength: 1,
        pattern: "^[A-Za-zÀ-ÿ]+$",
        example: "A"
    )]
    public string $classification;

    #[OA\Property(
        property: "cref",
        description: "Número do registro CREF (formato: 123456-G/SP)",
        type: "string",
        maxLength: 20,
        pattern: "^[0-9]{1,6}-[A-Z]\/[A-Z]{2}$",
        nullable: true,
        example: "123456-G/SP"
    )]
    public ?string $cref;

    #[OA\Property(
        property: "crefito",
        description: "Número do registro CREFITO (formato: 3/123456-F)",
        type: "string",
        maxLength: 20,
        pattern: "^\d+\/\d{1,6}-[A-Z]$",
        nullable: true,
        example: "3/123456-F"
    )]
    public ?string $crefito;

    #[OA\Property(
        property: "fulladdress",
        description: "Endereço completo (mínimo 15 caracteres)",
        type: "string",
        minLength: 15,
        maxLength: 255,
        example: "Rua das Flores, 123 - Centro - São Paulo/SP"
    )]
    public string $fulladdress;
}
