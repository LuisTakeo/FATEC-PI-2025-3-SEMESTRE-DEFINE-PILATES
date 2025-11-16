<?php

namespace App\Application\DTOs;

class StudentAulaDTO
{
    public function __construct(
        public readonly int $id_student,
        public readonly int $id_aula
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            id_student: $data['id_student'],
            id_aula: $data['id_aula']
        );
    }

    public function toArray(): array
    {
        return [
            'id_student' => $this->id_student,
            'id_aula' => $this->id_aula
        ];
    }
}
