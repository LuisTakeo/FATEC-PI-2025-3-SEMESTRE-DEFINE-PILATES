<?php

namespace App\Adapters\Http\Student;

use App\Application\DTOs\StudentDTO;
use Illuminate\Foundation\Http\FormRequest;
use App\Adapters\Http\Exceptions\ValidationException;
use Illuminate\Contracts\Validation\Validator;

class StudentLoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'       => ['required','string','max:255'],
            'password'   => ['required','string','min:6'],
        ];
    }

}