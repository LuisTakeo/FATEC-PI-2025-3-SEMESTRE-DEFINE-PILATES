<?php

namespace App\Models\MongoModels;

use Jenssegers\Mongodb\Eloquent\Model;

class Alert extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'alertas';

    protected $fillable = [
        'Id_students',      
        'Id_studios',       
        'Id_payments',     
        'tipo',             
        'mensagem',        
        'dataGeracao',      
        'status',          
    ];

    protected $casts = [
        'dataGeracao' => 'datetime',
    ];
}
