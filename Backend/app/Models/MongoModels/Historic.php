<?php

namespace App\Models\MongoModels;

use Mongodb\Laravel\Eloquent\Model;

class Historic extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'historico';

    protected $fillable = [
        'Id_students',            
        'Id_classprofessions',    
        'Id_plans',              
        'plan_type',             
        'frequency',              
        'status_plan',            
        'datebeginning',          
        'deadline',               
        'baseprice',              

        'Id_type_classes',       
        'Id_instructors',         
        'class_status',           
        'class_date',            
        'reposicao',              
        'observations_class',    

        
        'weight',                 
        'height',                
        'imc',
        'flexibility',
        'strength',
        'observations_reassessment',

        
        'Id_payments',           
        'payment_date',           
        'amount',                 
        'payment_method',        
        'payment_status',         

       
        'Id_exams',
        'exam_type',
        'exam_date',
        'exam_result',
        'exam_file',

      
        'Id_medications',
        'medication_name',
        'dosage',
        'frequency_med',
        'start_date',
        'end_date',
        'observations_med',

        
        'Id_treatments',
        'treatment_type',
        'treatment_description',
        'treatment_start',
        'treatment_end',
        'observations_treatment',
    ];

    protected $casts = [
        'class_date' => 'datetime',
        'payment_date' => 'datetime',
        'exam_date' => 'datetime',
        'treatment_start' => 'datetime',
        'treatment_end' => 'datetime',
        'datebeginning' => 'datetime',
        'deadline' => 'datetime',
    ];
}
