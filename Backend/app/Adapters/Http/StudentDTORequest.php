<?php

namespace App\Adapters\Http;

use Illuminate\Foundation\Http\FormRequest;
use App\Adapters\Http\Exceptions\ValidationException;
use Illuminate\Contracts\Validation\Validator;

class StudentDTORequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'       => ['required','string','max:255'],
            'phone'      => [
                'required',
                'string',
                'regex:/^(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/'
            ],
            'password' => ['required', 'string',''],
            'cpf' => ['required','string',''],
            'profession' => ['required','string',''],
            // 'birth_date' => ['required','date'],
            // 'gender'     => ['nullable','in:M,F,O'],
        ];
    }

    public function messages(): array
    {
        return [
            'phone.required' => 'O telefone celular é obrigatório.',
            'phone.regex' => 'Formato inválido. Use: 11999999999 ou (11)99999-9999',
        ];
    }

    protected function prepareForValidation()
    {
        \Log::debug('StudentDTORequest - Raw input', [
            'all' => $this->all(),
            'input' => $this->input(),
            'json' => $this->json() ? $this->json()->all() : null,
            'content' => $this->getContent(),
            'headers' => $this->headers->all()
        ]);
    }

    protected function failedValidation(Validator $validator)
    {
        \Log::error('StudentDTORequest - Validation failed', [
            'errors' => $validator->errors()->toArray(),
            'input_data' => $this->all()
        ]);
        
        throw new ValidationException(
            $validator->errors()->toArray(),
            'Student validation failed'
        );
    }
}