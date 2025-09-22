<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TypePlan extends Model
{
    use HasFactory;

    protected $table = 'type_plans';
    protected $primaryKey = 'Id_type_plans';

    protected $fillable = [
        'type',
        'weeklyfrequency',
        'baseprice',
    ];

    public function plans(): HasMany
    {
        return $this->hasMany(Plan::class, 'Id_type_plans');
    }
}