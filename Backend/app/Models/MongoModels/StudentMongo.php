<?php

namespace App\Models\MongoModels;

use Jenssegers\Mongodb\Eloquent\Model;

class StudentMongo extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'students_mongo';

    protected $fillable = [
        'Id_students',      
        'foto',             
        'contato',          
        'endereco',         
    ];
}
