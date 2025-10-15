<?php

namespace App\Application\DTOs;

use Illuminate\Contracts\Support\Arrayable;
use DateTime;

final class InstructorDTO implements Arrayable {
    public function __construct(
        public readonly string $name,
        public readonly string $phone,
        public readonly string $password,
        public readonly string $classification,
        public readonly string $cref,
        public readonly string $crefito,
        public readonly string $fulladdress,
        public readonly DateTime $hiring,
        public readonly DateTime $birthDate,
        public readonly ?int $id = null
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            id: $data['id'] ?? null,
            name: $data['name'],
            phone: $data['phone'],
            password: $data['password'],
            hiring: DateTime::createFromFormat('d-m-Y', $data['hiring']),
            birthDate: DateTime::createFromFormat('d-m-Y', $data['birth_date']),
            classification: $data['classification'],
            cref: $data['cref'],
            crefito: $data['crefito'],
            fulladdress: $data['fulladdress'],
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'phone' => $this->phone,
            'password' => $this->password,
            'hiring' => $this->hiring->format("d-m-Y"),
            'birth_date' => $this->birthDate->format("d-m-Y"),
            'classification' => $this->classification,
            'cref' => $this->cref,
            'crefito' => $this->crefito,
            'fulladdress' => $this->fulladdress,

        ];
    }

}