<?php

namespace App\Models\MongoModels;

use Jenssegers\Mongodb\Eloquent\Model;

class Visitor extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'visitors_mongo';

    protected $fillable = [
        'nome_completo',
        'telefone',
        'data_visita',
        'forma_conhecimento',
        'status',
        'observacoes'
    ];
}
