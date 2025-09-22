<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TypeClass extends Model
{
    use HasFactory;

    protected $table = 'type_classes';
    protected $primaryKey = 'Id_type_classes';

    protected $fillable = [
        'typeclass',
    ];

    public function scheduleStudios(): HasMany
    {
        return $this->hasMany(ScheduleStudio::class, 'Id_type_classes');
    }
}