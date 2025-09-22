<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Plan extends Model
{
    use HasFactory;

    protected $table = 'plans';
    protected $primaryKey = 'Id_plans';

    protected $fillable = [
        'Id_type_plans',
        'Id_students',
        'datebeginning',
        'datefinal',
        'statusplan',
        'frequency',
        'baseprice',
    ];

    public function typePlan(): BelongsTo
    {
        return $this->belongsTo(TypePlan::class, 'Id_type_plans');
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'Id_students');
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class, 'Id_plans');
    }

    public function contracts(): HasMany
    {
        return $this->hasMany(Contract::class, 'Id_plans');
    }
}