<?php

namespace App\Swagger\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "StudentAulaRegisterRequest",
    type: "object",
    title: "Student Aula Register Request",
    required: ["id_student"]
)]
class StudentAulaRegisterRequest
{
    #[OA\Property(
        property: "id_student",
        type: "integer",
        example: 1,
        description: "ID do aluno a ser cadastrado na aula"
    )]
    public int $id_student;
}
