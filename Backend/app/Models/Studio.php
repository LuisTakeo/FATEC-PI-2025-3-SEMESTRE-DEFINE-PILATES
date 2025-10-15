<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Studio extends Model
{
    use HasFactory;

    protected $table = 'studios';
    protected $primaryKey = 'Id_studios';

    protected $fillable = [
        'Id_instructors',
        'studioname',
        'address',
        'businesshour',
        'vacation',
        'recess',
    ];

    public function instructor(): BelongsTo
    {
        return $this->belongsTo(Instructor::class, 'Id_instructors');
    }

    public function scheduleStudios(): HasMany
    {
        return $this->hasMany(ScheduleStudio::class, 'Id_studios');
    }
}