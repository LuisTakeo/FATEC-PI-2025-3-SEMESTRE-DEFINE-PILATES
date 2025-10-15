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
            'phone'      => ['required','string','regex:/^\d{10,11}$/'], // somente dígitos após sanitização
            'password'   => ['required','string','min:6'],
            'cpf'        => ['required','string','size:11'],             // somente dígitos após sanitização
            'profession' => ['required','string','max:255'],
            'birth_date' => ['required','date','date_format:d-m-Y','before:today','after:01-01-1900'],

            'fotos'      => ['nullable','array','max:5'],
            'fotos.*'    => [
                'string',
                'regex:/^data:image\/(jpeg|jpg|png|gif);base64,/',

                function ($attribute, $value, $fail) {
                    $imageSize = strlen($value);
                    if ($imageSize > 3 * 1024 * 1024) {
                        $fail('A imagem é muito grande. Máximo 3MB.');
                    }
                    $base64Data = substr($value, strpos($value, ',') + 1);
                    if (!base64_decode($base64Data, true)) {
                        $fail('Formato de imagem inválido.');
                    }
                },
            ],

            'contatos'                 => ['nullable','array','max:3'],
            'contatos.*.tipo'          => ['required_with:contatos','string','in:telefone,email,whatsapp,emergencia'],
            'contatos.*.valor'         => ['required_with:contatos','string','max:255'],
            'contatos.*.observacao'    => ['nullable','string','max:500'],

            'enderecos'                => ['nullable','array','max:2'],
            'enderecos.*.tipo'         => ['required_with:enderecos','string','in:residencial,comercial,cobranca'],
            'enderecos.*.rua'          => ['required_with:enderecos','string','max:255'],
            'enderecos.*.numero'       => ['required_with:enderecos','string','max:10'],
            'enderecos.*.complemento'  => ['nullable','string','max:100'],
            'enderecos.*.bairro'       => ['required_with:enderecos','string','max:100'],
            'enderecos.*.cidade'       => ['required_with:enderecos','string','max:100'],
            'enderecos.*.estado'       => ['required_with:enderecos','string','size:2','regex:/^[A-Z]{2}$/'],
            'enderecos.*.cep'          => ['required_with:enderecos','string','regex:/^\d{5}-?\d{3}$/'],
            'enderecos.*.principal'    => ['nullable','boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'phone.required' => 'O telefone celular é obrigatório.',
            'phone.regex' => 'Informe 10 ou 11 dígitos numéricos.',
            'cpf.size' => 'O CPF deve ter exatamente 11 dígitos.',
            'birth_date.date' => 'Data de nascimento deve ser uma data válida.',
            'birth_date.date_format' => 'Data deve estar no formato DD-MM-YYYY (ex: 15-01-1990).',
            'birth_date.before' => 'Data de nascimento não pode ser no futuro.',
            'birth_date.after' => 'Data de nascimento deve ser posterior a 1900.',
            'fotos.array' => 'As fotos devem ser enviadas como array.',
            'fotos.max' => 'Máximo 5 fotos permitidas.',
            'fotos.*.regex' => 'Formato de imagem inválido. Use Base64 de JPEG, PNG ou GIF.',
            'contatos.array' => 'Os contatos devem ser enviados como array.',
            'contatos.max' => 'Máximo 3 contatos adicionais permitidos.',
            'contatos.*.tipo.in' => 'Tipo de contato deve ser: telefone, email, whatsapp ou emergencia.',
            'enderecos.array' => 'Os endereços devem ser enviados como array.',
            'enderecos.max' => 'Máximo 2 endereços permitidos.',
            'enderecos.*.estado.size' => 'O estado deve ter exatamente 2 caracteres (ex: SP).',
            'enderecos.*.estado.regex' => 'O estado deve ser uma sigla válida em maiúsculas (ex: SP, RJ).',
            'enderecos.*.cep.regex' => 'O CEP deve estar no formato 12345-678 ou 12345678.',
        ];
    }

    protected function prepareForValidation()
    {
        $input = $this->all();

        // trims básicos
        foreach (['name','profession'] as $k) {
            if (isset($input[$k]) && is_string($input[$k])) {
                $input[$k] = trim(strip_tags($input[$k]));
            }
        }

        // só dígitos
        foreach (['phone','cpf'] as $k) {
            if (isset($input[$k])) {
                $input[$k] = preg_replace('/\D+/', '', (string)$input[$k]);
            }
        }

        // normaliza UF
        if (isset($input['enderecos']) && is_array($input['enderecos'])) {
            foreach ($input['enderecos'] as $i => $end) {
                if (isset($end['estado']) && is_string($end['estado'])) {
                    $input['enderecos'][$i]['estado'] = strtoupper($end['estado']);
                }
            }
        }

        $this->merge($input);

        \Log::debug('StudentDTORequest - Normalized input', [
            'input' => $this->all(),
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