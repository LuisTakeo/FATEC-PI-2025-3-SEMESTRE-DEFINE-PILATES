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
        'id_users', // ✅ FK para UserTgi compartilhado (lowercase para PostgreSQL)
    ];

    // ✅ Student PERTENCE a um UserTgi (BelongsTo)
    public function userTgi(): BelongsTo
    {
        return $this->belongsTo(UserTgi::class, 'id_users', 'id_users');
    }

    public function professionClassification(): BelongsTo
    {
        return $this->belongsTo(ProfessionClassification::class, 'Id_classprofessions');
    }

    // ✅ Relacionamentos existentes
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