<?php

namespace App\Models\MongoModels;

use Mongodb\Laravel\Eloquent\Model;

class StudentMongo extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'students_mongo';

    protected $fillable = [
        'Id_students',      
        'fotos',             
        'contatos',          
        'enderecos',         
    ];

    protected $casts = [
        'fotos' => 'array',
        'contatos' => 'array',
        'enderecos' => 'array',
    ];

    protected $attributes = [
        'fotos' => [],
        'contatos' => [],
        'enderecos' => [],
    ];

    public function adicionarFoto(string $fotoBase64, ?string $descricao = null): bool
    {
        $fotos = $this->fotos ?? [];
        
        $novaFoto = [
            'imagem' => $fotoBase64,
            'descricao' => $descricao,
            'tamanho' => strlen($fotoBase64),
            'mime_type' => $this->extrairMimeType($fotoBase64),
            'data_upload' => now()->toISOString(),
        ];
        
        $fotos[] = $novaFoto;
        $this->fotos = $fotos;
        
        return $this->save();
    }

    public function adicionarContato(string $tipo, string $valor, ?string $observacao = null): bool
    {
        $contatos = $this->contatos ?? [];
        
        $contatos[] = [
            'tipo' => $tipo,
            'valor' => $valor,
            'observacao' => $observacao,
            'data_criacao' => now()->toISOString(),
        ];
        
        $this->contatos = $contatos;
        return $this->save();
    }

    public function adicionarEndereco(array $dadosEndereco): bool
    {
        $enderecos = $this->enderecos ?? [];
        
        $enderecos[] = [
            'tipo' => $dadosEndereco['tipo'] ?? 'residencial',
            'rua' => $dadosEndereco['rua'],
            'numero' => $dadosEndereco['numero'],
            'complemento' => $dadosEndereco['complemento'] ?? null,
            'bairro' => $dadosEndereco['bairro'],
            'cidade' => $dadosEndereco['cidade'],
            'estado' => $dadosEndereco['estado'],
            'cep' => $dadosEndereco['cep'],
            'principal' => $dadosEndereco['principal'] ?? empty($enderecos),
            'data_criacao' => now()->toISOString(),
        ];
        
        $this->enderecos = $enderecos;
        return $this->save();
    }

    public function getFotosEvolucao(): array
    {
        $fotos = $this->fotos ?? [];
        return collect($fotos)
            ->where('tipo', 'evolucao')
            ->sortBy('data_avaliacao')
            ->values()
            ->toArray();
    }



}
