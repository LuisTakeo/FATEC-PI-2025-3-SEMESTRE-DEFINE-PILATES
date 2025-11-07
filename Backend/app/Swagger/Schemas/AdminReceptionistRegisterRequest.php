<?php

namespace App\Swagger\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "AdminReceptionistRegisterRequest",
    type: "object",
    title: "Admin/Receptionist Register Request",
    description: "Request body for admin or receptionist registration",
    required: ["name", "phone", "password", "birth_date", "hiring", "classification", "typecollaborator", "fulladdress"]
)]
class AdminReceptionistRegisterRequest
{
    #[OA\Property(
        property: "name",
        description: "Nome completo do colaborador",
        type: "string",
        maxLength: 255,
        example: "Maria Santos"
    )]
    public string $name;

    #[OA\Property(
        property: "phone",
        description: "Telefone principal (formato: 11999999999 ou (11)99999-9999)",
        type: "string",
        example: "(11)98765-4321"
    )]
    public string $phone;

    #[OA\Property(
        property: "password",
        description: "Senha de acesso (mínimo 8 caracteres, deve conter maiúscula, minúscula, número e caractere especial)",
        type: "string",
        minLength: 8,
        maxLength: 16,
        example: "Senha@123"
    )]
    public string $password;

    #[OA\Property(
        property: "birth_date",
        description: "Data de nascimento (formato DD-MM-YYYY)",
        type: "string",
        format: "date",
        example: "15-03-1985"
    )]
    public string $birth_date;

    #[OA\Property(
        property: "hiring",
        description: "Data de contratação (formato DD-MM-YYYY)",
        type: "string",
        format: "date",
        example: "01-02-2024"
    )]
    public string $hiring;

    #[OA\Property(
        property: "classification",
        description: "Classificação profissional (1 letra)",
        type: "string",
        maxLength: 1,
        example: "A"
    )]
    public string $classification;

    #[OA\Property(
        property: "typecollaborator",
        description: "Tipo de colaborador",
        type: "string",
        enum: ["Administrator", "Receptionist"],
        example: "Administrator"
    )]
    public string $typecollaborator;

    #[OA\Property(
        property: "fulladdress",
        description: "Endereço completo (mínimo 15 caracteres, máximo 255)",
        type: "string",
        minLength: 15,
        maxLength: 255,
        example: "Rua XV de Novembro, 745, Centro, Curitiba - PR"
    )]
    public string $fulladdress;
}
