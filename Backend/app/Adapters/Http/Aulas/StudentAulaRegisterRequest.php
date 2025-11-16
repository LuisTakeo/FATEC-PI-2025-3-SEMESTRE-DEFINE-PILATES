<?php

namespace App\Adapters\Http\Aulas;

use App\Application\DTOs\StudentAulaDTO;
use Illuminate\Foundation\Http\FormRequest;

class StudentAulaRegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id_student' => ['required', 'integer', 'exists:students,Id_students']
        ];
    }

    public function messages(): array
    {
        return [
            'id_student.required' => 'O ID do aluno é obrigatório.',
            'id_student.integer' => 'O ID do aluno deve ser um número inteiro.',
            'id_student.exists' => 'Aluno não encontrado.'
        ];
    }
}
