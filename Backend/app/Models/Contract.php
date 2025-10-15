<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contract extends Model
{
    use HasFactory;

    protected $table = 'contracts';
    protected $primaryKey = 'Id_contracts';

    protected $fillable = [
        'Id_students',
        'Id_plans',
        'datebeginning',
        'deadline',
        'contractstatus',
        'freeuseimage',
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'Id_students');
    }

    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plan::class, 'Id_plans');
    }
}