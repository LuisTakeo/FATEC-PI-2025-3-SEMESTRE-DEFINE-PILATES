<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Instructor extends Model
{
    use HasFactory;

    protected $table = 'instructors';
    protected $primaryKey = 'Id_instructors';

    protected $fillable = [
        'Id_collaborators',
        'Id_users',
        'cref',
        'crefito',
        'birthday',
        'hiring',
        'classification',
    ];

    public function collaborator(): BelongsTo
    {
        return $this->belongsTo(Collaborator::class, 'Id_collaborators');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(UserTgi::class, 'Id_users', 'id_users');
    }

    public function studios(): HasMany
    {
        return $this->hasMany(Studio::class, 'Id_instructors');
    }

    public function scheduleStudios(): HasMany
    {
        return $this->hasMany(ScheduleStudio::class, 'Id_instructors');
    }
}