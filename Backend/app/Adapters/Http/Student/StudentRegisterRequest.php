<?php

namespace App\Adapters\Http\Student;

use App\Application\DTOs\StudentDTO;
use Illuminate\Foundation\Http\FormRequest;
use App\Adapters\Http\Exceptions\ValidationException;
use Illuminate\Contracts\Validation\Validator;

class StudentRegisterRequest extends FormRequest
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
            'birth_date' => ['required','date',
                'date_format:d-m-Y',
                'before:today',           // ✅ Não pode ser no futuro
                'after:01-01-1900'       // ✅ Data mínima razoável
            ],
            // 'gender'     => ['nullable','in:M,F,O'],
            'fotos' => ['nullable', 'array', 'max:5'], // Máximo 5 fotos
            'fotos.*' => [
                'string',
                'regex:/^data:image\/(jpeg|jpg|png|gif);base64,/', // ✅ Validar Base64 de imagem
                function ($attribute, $value, $fail) {
                    // Validar tamanho (máx 3MB em Base64)
                    $imageSize = strlen($value);
                    if ($imageSize > 3 * 1024 * 1024) {
                        $fail('A imagem é muito grande. Máximo 3MB.');
                    }
                    
                    // Validar se Base64 é válido
                    $base64Data = substr($value, strpos($value, ',') + 1);
                    if (!base64_decode($base64Data, true)) {
                        $fail('Formato de imagem inválido.');
                    }
                },
            ],

            // ✅ MongoDB - CONTATOS (opcionais)
            'contatos' => ['nullable', 'array', 'max:3'], // Máximo 3 contatos extras
            'contatos.*.tipo' => [
                'required_with:contatos',
                'string',
                'in:telefone,email,whatsapp,emergencia'
            ],
            'contatos.*.valor' => ['required_with:contatos', 'string', 'max:255'],
            'contatos.*.observacao' => ['nullable', 'string', 'max:500'],

            // ✅ MongoDB - ENDEREÇOS (opcionais)
            'enderecos' => ['nullable', 'array', 'max:2'], // Máximo 2 endereços
            'enderecos.*.tipo' => [
                'required_with:enderecos',
                'string',
                'in:residencial,comercial,cobranca'
            ],
            'enderecos.*.rua' => ['required_with:enderecos', 'string', 'max:255'],
            'enderecos.*.numero' => ['required_with:enderecos', 'string', 'max:10'],
            'enderecos.*.complemento' => ['nullable', 'string', 'max:100'],
            'enderecos.*.bairro' => ['required_with:enderecos', 'string', 'max:100'],
            'enderecos.*.cidade' => ['required_with:enderecos', 'string', 'max:100'],
            'enderecos.*.estado' => [
                'required_with:enderecos',
                'string',
                'size:2',
                'regex:/^[A-Z]{2}$/' // ✅ Apenas siglas maiúsculas (SP, RJ, etc)
            ],
            'enderecos.*.cep' => [
                'required_with:enderecos',
                'string',
                'regex:/^\d{5}-?\d{3}$/' // ✅ CEP com ou sem hífen
            ],
            'enderecos.*.principal' => ['nullable', 'boolean'],

        ];
    }

    public function messages(): array
    {
        return [
            'phone.required' => 'O telefone celular é obrigatório.',
            'phone.regex' => 'Formato inválido. Use: 11999999999 ou (11)99999-9999',
            'cpf.unique' => 'Este CPF já está cadastrado no sistema.',
            'cpf.size' => 'O CPF deve ter exatamente 11 dígitos.',
            'birth_date.date' => 'Data de nascimento deve ser uma data válida.',
            'birth_date.date_format' => 'Data deve estar no formato DD-MM-YYYY (ex: 15-01-1990).',
            'birth_date.before' => 'Data de nascimento não pode ser no futuro.',
            'birth_date.after' => 'Data de nascimento deve ser posterior a 1900.',
            'fotos.array' => 'As fotos devem ser enviadas como array.',
            'fotos.max' => 'Máximo 5 fotos permitidas.',
            'fotos.*.regex' => 'Formato de imagem inválido. Use Base64 de JPEG, PNG ou GIF.',

            // ✅ Mensagens MongoDB - Contatos
            'contatos.array' => 'Os contatos devem ser enviados como array.',
            'contatos.max' => 'Máximo 3 contatos adicionais permitidos.',
            'contatos.*.tipo.in' => 'Tipo de contato deve ser: telefone, email, whatsapp ou emergencia.',
            'contatos.*.valor.required_with' => 'O valor do contato é obrigatório.',
            'contatos.*.valor.max' => 'O valor do contato deve ter no máximo 255 caracteres.',
            'contatos.*.observacao.max' => 'A observação deve ter no máximo 500 caracteres.',

            // ✅ Mensagens MongoDB - Endereços
            'enderecos.array' => 'Os endereços devem ser enviados como array.',
            'enderecos.max' => 'Máximo 2 endereços permitidos.',
            'enderecos.*.tipo.in' => 'Tipo de endereço deve ser: residencial, comercial ou cobranca.',
            'enderecos.*.rua.required_with' => 'A rua é obrigatória quando informado endereço.',
            'enderecos.*.numero.required_with' => 'O número é obrigatório quando informado endereço.',
            'enderecos.*.bairro.required_with' => 'O bairro é obrigatório quando informado endereço.',
            'enderecos.*.cidade.required_with' => 'A cidade é obrigatória quando informado endereço.',
            'enderecos.*.estado.required_with' => 'O estado é obrigatório quando informado endereço.',
            'enderecos.*.estado.size' => 'O estado deve ter exatamente 2 caracteres (ex: SP).',
            'enderecos.*.estado.regex' => 'O estado deve ser uma sigla válida em maiúsculas (ex: SP, RJ).',
            'enderecos.*.cep.required_with' => 'O CEP é obrigatório quando informado endereço.',
            'enderecos.*.cep.regex' => 'O CEP deve estar no formato 12345-678 ou 12345678.',
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

    public function toDTO(): StudentDTO
    {
        return StudentDTO::fromArray($this->validated());
    }
}