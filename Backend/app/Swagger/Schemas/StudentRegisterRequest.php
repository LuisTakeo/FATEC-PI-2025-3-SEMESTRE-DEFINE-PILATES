<?php
// Backend/app/Swagger/Schemas/StudentRegisterRequest.php

namespace App\Swagger\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "StudentRegisterRequest",
    type: "object",
    title: "Student Register Request",
    description: "Request body for student registration",
    required: ["name", "phone", "password", "cpf", "profession", "birth_date"]
)]
class StudentRegisterRequest 
{
    #[OA\Property(
        property: "name",
        description: "Nome completo do estudante",
        type: "string",
        maxLength: 255,
        example: "João Silva"
    )]
    public string $name;

    #[OA\Property(
        property: "phone", 
        description: "Telefone principal (usado como login)",
        type: "string",
        example: "(11)99999-9999"
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
        property: "cpf",
        description: "CPF do estudante (apenas números)",
        type: "string", 
        maxLength: 11,
        minLength: 11,
        example: "12345678901"
    )]
    public string $cpf;

    #[OA\Property(
        property: "profession",
        description: "Profissão do estudante",
        type: "string",
        maxLength: 255,
        example: "Engenheiro"
    )]
    public string $profession;

    #[OA\Property(
        property: "birth_date",
        description: "Data de nascimento (formato DD-MM-YYYY)",
        type: "string",
        format: "date",
        example: "15-01-1990"
    )]
    public string $birth_date;

    #[OA\Property(
        property: "fotos",
        description: "Fotos do estudante em Base64 (máximo 5 fotos, 3MB cada)",
        type: "array",
        maxItems: 5,
        items: new OA\Items(
            type: "string", 
            format: "base64",
            example: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
        ),
        nullable: true
    )]
    public ?array $fotos;

    #[OA\Property(
        property: "contatos",
        description: "Contatos adicionais do estudante (máximo 3)",
        type: "array",
        maxItems: 3,
        items: new OA\Items(ref: "#/components/schemas/Contato"),
        nullable: true
    )]
    public ?array $contatos;

    #[OA\Property(
        property: "enderecos",
        description: "Endereços do estudante (máximo 2)",
        type: "array", 
        maxItems: 2,
        items: new OA\Items(ref: "#/components/schemas/Endereco"),
        nullable: true
    )]
    public ?array $enderecos;
}