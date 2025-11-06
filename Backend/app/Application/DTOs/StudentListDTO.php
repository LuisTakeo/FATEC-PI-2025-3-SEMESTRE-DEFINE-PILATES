<?php

namespace App\Application\DTOs;

use App\Models\UserTgi;

class StudentListDTO
{
    public function __construct(
        public readonly int $id,
        public readonly string $fullname,
        public readonly ?string $phone = null,
        public readonly string $typeuser,
        public readonly ?string $birthDate = null,
        public readonly ?string $cpf = null,
        public readonly ?string $profession = null
    ) {}

    public static function fromModel(UserTgi $user): self
    {
        $student = $user->student;
        
        return new self(
            id: $user->id_users,
            fullname: $user->fullname ?? '',
            phone: $user->nameuser,
            typeuser: $user->typeuser,
            birthDate: $user?->birthdate,
            cpf: $student?->cpf,
            profession: $student?->professionClassification?->classifications
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'fullname' => $this->fullname,
            'phone' => $this->phone,
            'typeuser' => $this->typeuser,
            'birth_date' => $this->birthDate,
            'cpf' => $this->cpf,
            'profession' => $this->profession
        ];
    }

    // public static function fromModelIdAndName(UserTgi $user): self
    // {
    //     return new self(
    //         id: $user->id_users,
    //         fullname: $user->fullname ?? '',
    //         phone: $user->nameuser,
    //         typeuser: $user->typeuser
    //     );
    // }
    
}
