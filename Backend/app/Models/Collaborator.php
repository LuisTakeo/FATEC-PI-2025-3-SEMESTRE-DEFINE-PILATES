<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Collaborator extends Model
{
    use HasFactory;

    protected $table = 'collaborators';
    protected $primaryKey = 'Id_collaborators';

    protected $fillable = [
        'Id_users',
        'typecollaborator',
        'birthday',
        'fulladdress',
        'hiring',
        'classification',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(UserTgi::class, 'Id_users');
    }

    public function instructors(): HasMany
    {
        return $this->hasMany(Instructor::class, 'Id_collaborators');
    }
}