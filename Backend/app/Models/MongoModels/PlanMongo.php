<?php

namespace App\Models\MongoModels;

use Jenssegers\Mongodb\Eloquent\Model;

class PlanMongo extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'plans_mongo';

    protected $fillable = [
        'id_plan_sql',        
        'id_student_sql',     
        'benefits',           
        'observations',       
        'created_at',         
        'updated_at',         
    ];

    protected $casts = [
        'benefits' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public static function criarPlano($idPlanSql, $idStudentSql, $benefits = [], $observations = '')
    {
        return self::create([
            'id_plan_sql' => $idPlanSql,
            'id_student_sql' => $idStudentSql,
            'benefits' => $benefits,
            'observations' => $observations,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public static function buscarPorAluno($idStudentSql)
    {
        return self::where('id_student_sql', $idStudentSql)->get();
    }
}
