<?php

namespace App\Adapters\Http\AdminReceptionist;

use App\Application\DTOs\AdminReceptionistDTO;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use App\Adapters\Http\Exceptions\ValidationException;

class AdminReceptionistRegisterRequest extends FormRequest{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required','string','max:255'],
            'phone' => [
                'required',
                'string',
                'regex:/^(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/'
            ],
            'password' => [
                'required', 
                'string',
                'min:8',
                'max:16',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,?_\-]).+$/'],

            'birth_date' => ['required','date',
                'date_format:d-m-Y',
                'before:today',           
                'after:01-01-1900'       
            ],
            'hiring' => ['required','date',
                'date_format:d-m-Y',           
                'after:01-01-1900'       
            ],
            'classification' => [
                'nullable',
                'string',
                'max:1',
                'regex:/^[A-Za-zÀ-ÿ]+$/'
            ],
            'typecollaborator' => [
                'required',
                'string',
                'in:Administrator,Receptionist'
            ],
     
            'fulladdress' => [
                'required',
                'string',
                'min:15',
                'max:255',
                'regex:/^[A-Za-zÀ-ÿ0-9\s,.-]+$/'
            ]
           ];
    }


    public function messages(): array
    {
        return [
            'name.required' => 'O nome é obrigatório.',
            'name.string' => 'O nome deve possuir apenas letras',
            'name.max' => 'O nome não pode exceder 255 caracteres.',
            'classification.string' => 'A classificação deve possuir apenas letras',
            'classification.max' => 'A classificação não pode exceder 1 caractere.',
            'classification.regex' => 'A classificação deve conter apenas letras.',
            'password.required' => 'A senha é obrigatória.',
            'password.min' => 'A senha deve ter no mínimo 8 caracteres.',
            'password.regex' => 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
            'phone.required' => 'O telefone celular é obrigatório.',
            'phone.regex' => 'Formato inválido. Use: 11999999999 ou (11)99999-9999',
            'birth_date.date' => 'Data de nascimento deve ser uma data válida.',
            'birth_date.date_format' => 'Data deve estar no formato DD-MM-YYYY (ex: 15-01-1990).',
            'birth_date.before' => 'Data de nascimento não pode ser no futuro.',
            'birth_date.after' => 'Data de nascimento deve ser posterior a 1900.',
            'hiring.date' => 'Data de nascimento deve ser uma data válida.',
            'hiring.date_format' => 'Data deve estar no formato DD-MM-YYYY (ex: 15-01-1990).',
            'hiring.after' => 'Data de nascimento deve ser posterior a 1900.',
            'fulladdress.required' => 'O endereço completo é obrigatório.',
            'fulladdress.min' => 'O endereço completo deve ter no mínimo 15 caracteres.',
            'fulladdress.max' => 'O endereço completo não pode exceder 255 caracteres.',
            'fulladdress.regex' => 'O endereço contém caracteres inválidos. Use apenas letras, números e pontuações comuns (vírgula, ponto, hífen).',
            'typecollaborator.required' => 'O tipo de colaborador é obrigatório.',
            'typecollaborator.in' => 'O tipo de colaborador deve ser "Administrator" ou "Receptionist", em inglês.',
            ];
    }

    protected function prepareForValidation(){
        \Log::debug('InstructorDTORequest - Raw input', [
            'all' => $this->all(),
            'input' => $this->input(),
            'json' => $this->json() ? $this->json()->all() : null,
            'content' => $this->getContent(),
            'headers' => $this->headers->all()
        ]);
    }

    protected function failedValidation(Validator $validator){
        \Log::error('InstructorDTORequest - Validation failed',[
            'errors' => $validator->errors()->toArray(),
            'input_data' => $this->all()
        ]);
        throw new ValidationException(
            $validator->errors()->toArray(),
            'Falha ao validar os campos.'
        );
    }
    public function toDTO(): AdminReceptionistDTO
    {
        return AdminReceptionistDTO::fromArray($this->validated());
    }
}