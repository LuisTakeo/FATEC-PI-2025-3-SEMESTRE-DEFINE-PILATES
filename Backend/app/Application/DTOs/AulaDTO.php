<?php

namespace App\Application\DTOs;

use Illuminate\Contracts\Support\Arrayable;
use DateTime;

final class AulaDTO implements Arrayable {
    public function __construct(
        public readonly int $id_tipo_aula,
        public readonly int $id_instrutor,
        public readonly int $id_studio,
        public readonly DateTime $data,
        public readonly string $horario

    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            id_tipo_aula: $data['id_tipo_aula'],
            id_instrutor: $data['id_instrutor'],
            id_studio: $data['id_studio'],
            data: DateTime::createFromFormat('d-m-Y', $data['data']),
            horario: $data['horario']
        );

    }

    public function toArray(): array
    {
        return [
            'id_tipo_aula' => $this->id_tipo_aula,
            'id_instrutor' => $this->id_instrutor,
            'id_studio' => $this->id_studio,
            'data' => $this->data->format("d-m-Y"),
            'horario' => $this->horario
        ];
    }

}