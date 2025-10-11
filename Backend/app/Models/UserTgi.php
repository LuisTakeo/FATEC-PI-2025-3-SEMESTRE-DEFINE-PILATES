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
    protected $primaryKey = 'Id_users'; 

    protected $fillable = [
        'nameuser',
        'passworduser',
        'typeuser',
        'statususer',
        'message_sent',
        'birthdate'
    ];

    protected $casts = [
        'birthdate' => 'date',
    ];

    public function collaborators(): HasMany
    {
        return $this->hasMany(Collaborator::class, 'id_users');
    }
}