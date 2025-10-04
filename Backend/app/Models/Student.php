<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    use HasFactory;

    protected $table = 'students';
    protected $primaryKey = 'Id_students';

    protected $fillable = [
        'namestudent',
        'cpf',
        'Id_classprofessions',
    ];

    public function professionClassification(): BelongsTo
    {
        return $this->belongsTo(ProfessionClassification::class, 'Id_classprofessions');
    }

    public function plans(): HasMany
    {
        return $this->hasMany(Plan::class, 'Id_students');
    }

    public function studentSchedules(): HasMany
    {
        return $this->hasMany(StudentSchedule::class, 'Id_students');
    }

    public function scheduleStudios(): HasMany
    {
        return $this->hasMany(ScheduleStudio::class, 'Id_students');
    }

    public function contracts(): HasMany
    {
        return $this->hasMany(Contract::class, 'Id_students');
    }
}