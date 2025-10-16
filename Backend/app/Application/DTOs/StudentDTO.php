<?php

namespace App\Application\DTOs;

use DateTime;
use Illuminate\Contracts\Support\Arrayable;
use InvalidArgumentException;

final class StudentDTO implements Arrayable
{
    public function __construct(
        public readonly string $name,
        public readonly string $phone,
        public readonly string $password,
        public readonly string $cpf,
        public readonly string $profession,
        public readonly DateTime $birthDate,
        public readonly array $fotos = [],
        public readonly array $contatos = [],
        public readonly array $enderecos = [],
        public readonly ?int $id = null
    ) {}

    public static function fromArray(array $data): self
    {
        $birth = DateTime::createFromFormat('d-m-Y', (string)($data['birth_date'] ?? ''));
        if (!$birth) {
            throw new InvalidArgumentException('birth_date inválida. Formato esperado: d-m-Y');
        }

        // idempotente (Request já normaliza)
        $phone = preg_replace('/\D+/', '', (string)($data['phone'] ?? ''));
        $cpf   = preg_replace('/\D+/', '', (string)($data['cpf'] ?? ''));

        $fotos     = is_array($data['fotos'] ?? null) ? $data['fotos'] : [];
        $contatos  = is_array($data['contatos'] ?? null) ? $data['contatos'] : [];
        $enderecos = is_array($data['enderecos'] ?? null) ? $data['enderecos'] : [];

        return new self(
            id: $data['id'] ?? null,
            name: (string)$data['name'],
            phone: $phone ?? '',
            password: (string)$data['password'], // hash no Adapter/Repository
            cpf: $cpf ?? '',
            profession: (string)$data['profession'],
            birthDate: $birth,
            fotos: $fotos,
            contatos: $contatos,
            enderecos: $enderecos,
        );
    }

    public function toArray(): array
    {
        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'phone'       => $this->phone,
            'password'    => $this->password,
            'cpf'         => $this->cpf,
            'profession'  => $this->profession,
            'birth_date'  => $this->birthDate->format('d-m-Y'),
            'fotos'       => $this->fotos,
            'contatos'    => $this->contatos,
            'enderecos'   => $this->enderecos,
        ];
    }

    public function withoutPassword(): array
    {
        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'phone'       => $this->phone,
            'cpf'         => $this->cpf,
            'profession'  => $this->profession,
            'birth_date'  => $this->birthDate->format('d-m-Y'),
            'fotos'       => $this->fotos,
            'contatos'    => $this->contatos,
            'enderecos'   => $this->enderecos,
        ];
    }
}