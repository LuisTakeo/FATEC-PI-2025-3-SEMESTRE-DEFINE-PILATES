<?php


namespace App\Application\DTOs;

use DateTime;
use Illuminate\Contracts\Support\Arrayable;

final class StudentDTO implements Arrayable 
{
    public function __construct(
        public readonly string $name,
        public readonly string $phone,
        public readonly string $password,
        public readonly string $cpf,
        public readonly string $profession,
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
            cpf: $data['cpf'],
            profession: $data['profession'],
            birthDate: DateTime::createFromFormat('d-m-Y', $data['birth_date']),
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'phone' => $this->phone,
            'password' => $this->password,
            'cpf' => $this->cpf,
            'profession' => $this->profession,
            'birth_date' => $this->birthDate->format("d-m-Y"),
        ];
    }

    public function withoutPassword(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'phone' => $this->phone,
            'cpf' => $this->cpf,
            'profession' => $this->profession,
            'birth_date' => $this->birthDate->format("d-m-Y"),
        ];
    }
}