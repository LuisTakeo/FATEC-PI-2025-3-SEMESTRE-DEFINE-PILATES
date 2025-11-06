<?php

namespace App\Adapters\Http\Instructor;
use App\Adapters\Http\Exceptions\ValidationException;
use App\Application\DTOs\InstructorDTO;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;


class InstructorRegisterRequest extends FormRequest{
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
            'password' => ['required', 'string',''],
            
            'cref' => [
                'nullable',
                'string',
                'max:20',
                'unique:instructors,cref',
                'regex:/^[0-9]{1,6}-[A-Z]\/[A-Z]{2}$/
' 
            ],
            'crefito' => [
                'nullable',
                'string',
                'max:20',
                'unique:instructors,crefito',
                'regex:/^\d{6}-[A-Z]$/'
            ],

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
                'required',
                'string',
                'max:1',
                'regex:/^[A-Za-zÀ-ÿ]+$/'
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
            'phone.required' => 'O telefone celular é obrigatório.',
            'phone.regex' => 'Formato inválido. Use: 11999999999 ou (11)99999-9999',
            'birth_date.date' => 'Data de nascimento deve ser uma data válida.',
            'birth_date.date_format' => 'Data deve estar no formato DD-MM-YYYY (ex: 15-01-1990).',
            'birth_date.before' => 'Data de nascimento não pode ser no futuro.',
            'birth_date.after' => 'Data de nascimento deve ser posterior a 1900.',
            'cref.unique' => 'Este CREF já está cadastrado no sistema.',
            'crefito.unique' => 'Este CREFITO já está cadastrado no sistema.',
            'hiring.date' => 'Data de nascimento deve ser uma data válida.',
            'hiring.date_format' => 'Data deve estar no formato DD-MM-YYYY (ex: 15-01-1990).',
            'hiring.after' => 'Data de nascimento deve ser posterior a 1900.',
            'fulladdress.required' => 'O endereço completo é obrigatório.',
            'fulladdress.min' => 'O endereço completo deve ter no mínimo 15 caracteres.',
            'fulladdress.max' => 'O endereço completo não pode exceder 255 caracteres.',
            'fulladdress.regex' => 'O endereço contém caracteres inválidos. Use apenas letras, números e pontuações comuns (vírgula, ponto, hífen).',
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
    public function toDTO(): InstructorDTO
    {
        return InstructorDTO::fromArray($this->validated());
    }
}