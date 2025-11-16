<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentSchedule extends Model
{
    use HasFactory;

    protected $table = 'student_schedules';
    protected $primaryKey = null;
    public $incrementing = false;
    public $timestamps = false; // Desabilita created_at e updated_at

    protected $fillable = [
        'Id_schedule_studios',
        'Id_students',
        'status',
    ];

    public function scheduleStudio(): BelongsTo
    {
        return $this->belongsTo(ScheduleStudio::class, 'Id_schedule_studios');
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'Id_students');
    }
}