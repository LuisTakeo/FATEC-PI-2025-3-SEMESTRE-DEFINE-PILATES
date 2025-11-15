<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ScheduleStudio extends Model
{
    use HasFactory;

    protected $table = 'schedule_studios';
    protected $primaryKey = 'Id_schedule_studios';

    protected $fillable = [
        'Id_type_classes',
        'Id_instructors',
        'Id_studios',
        'observation',
        'scheduledate',
        'scheduletime',
    ];

    public function typeClass(): BelongsTo
    {
        return $this->belongsTo(TypeClass::class, 'Id_type_classes');
    }

    public function instructor(): BelongsTo
    {
        return $this->belongsTo(Instructor::class, 'Id_instructors');
    }

    public function studio(): BelongsTo
    {
        return $this->belongsTo(Studio::class, 'Id_studios', 'Id_studios');
    }

    public function studentSchedules(): HasMany
    {
        return $this->hasMany(StudentSchedule::class, 'Id_schedule_studios');
    }
}