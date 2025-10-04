<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UserTgi extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $table = 'users';
    protected $primaryKey = 'id_users'; 

    protected $fillable = [
        'nameuser',
        'passworduser',
        'typeuser',
        'statususer',
        'email_sent',
    ];

    public function collaborators(): HasMany
    {
        return $this->hasMany(Collaborator::class, 'id_users');
    }
}