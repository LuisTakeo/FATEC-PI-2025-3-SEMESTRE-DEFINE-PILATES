<?php

namespace App\Adapters\Http\Aulas;
use App\Adapters\Http\Exceptions\ValidationException;
use App\Application\DTOs\AulaDTO;
use App\Application\DTOs\InstructorDTO;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;


class AulaRegisterRequest extends FormRequest{
    public function authorize(): bool
    {
        return true;
    }
    // regex ser 1 ou 2 digitos para hora
    public function rules(): array
    {
        return [
            'id_tipo_aula' => ['required','integer'],
            'id_instrutor' => ['required','integer'],
            'id_studio' => ['required','integer'],
            'data' => [
                'required',
                'date',
                'date_format:d-m-Y',
                'after:today' // Apenas datas a partir de amanhã
            ],
            'horario' => ['required','string','max:5', 'regex:/^\d{1,2}:\d{2}$/'],
           ];
    }


    public function messages(): array
    {
        return [
            'id_tipo_aula.required' => 'O campo id_tipo_aula é obrigatório.',
            'id_instrutor.required' => 'O campo id_instrutor é obrigatório.',
            'id_studio.required' => 'O campo id_studio é obrigatório.',
            'data.required' => 'O campo data é obrigatório.',
            'data.after' => 'A data do agendamento deve ser a partir de amanhã.',
            'horario.required' => 'O campo horario é obrigatório.',
            'horario.regex' => 'O campo horario deve estar no formato HH:MM.',
        ];
    }

    protected function prepareForValidation(){
        if ($this->has('data')) {
            $data = $this->input('data');
            $dataFormatada = date('d-m-Y', strtotime($data));
            $this->merge(['data' => $dataFormatada]);
        }
    }

  
    public function toDTO(): AulaDTO
    {
        return AulaDTO::fromArray($this->validated());
    }
}