<?php


namespace App\Application\DTOs;

use Illuminate\Contracts\Support\Arrayable;

final class StudentDTO implements Arrayable 
{
    public function __construct(
        public readonly string $name,
        public readonly string $phone,
        public readonly string $password,
        public readonly string $cpf,
        public readonly string $profession,
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
            profession: $data['profession']
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
            'profession' => $this->profession
        ];
    }

    public function withoutPassword(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'phone' => $this->phone,
            'cpf' => $this->cpf,
            'profession' => $this->profession
        ];
    }
}