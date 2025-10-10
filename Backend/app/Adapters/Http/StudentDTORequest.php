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
            'email'      => ['required','email','max:255'],
            'phone'      => ['nullable','string','max:30'],
            'birth_date' => ['nullable','date'],
            'gender'     => ['nullable','in:M,F,O'],
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