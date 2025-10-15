<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class UserTgi extends Model
{
    use HasFactory;

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
        'message_sent' => 'boolean',
        'birthdate' => 'date',
    ];

    // ✅ UserTgi pode ter UM Student (se typeuser = 'student')
    public function student(): HasOne
    {
        return $this->hasOne(Student::class, 'Id_users', 'Id_users')
                    ->where('users.typeuser', 'student'); // ✅ Filtro por tipo
    }

    // ✅ UserTgi pode ter UM Instructor (se typeuser = 'instructor')
    public function instructor(): HasOne
    {
        return $this->hasOne(Instructor::class, 'Id_users', 'Id_users')
                    ->where('users.typeuser', 'instructor');
    }

    // ✅ UserTgi pode ter UM Collaborator (se typeuser = 'collaborator')
    public function collaborator(): HasOne
    {
        return $this->hasOne(Collaborator::class, 'Id_users', 'Id_users')
                    ->where('users.typeuser', 'collaborator');
    }

    // ✅ Método dinâmico para buscar o relacionamento correto
    public function getRelatedEntity()
    {
        return match($this->typeuser) {
            'student' => $this->student,
            'instructor' => $this->instructor,
            'collaborator' => $this->collaborator,
            default => null
        };
    }

    // ✅ Scopes para filtrar por tipo
    public function scopeStudents($query)
    {
        return $query->where('typeuser', 'student');
    }

    public function scopeInstructors($query)
    {
        return $query->where('typeuser', 'instructor');
    }

    public function scopeCollaborators($query)
    {
        return $query->where('typeuser', 'collaborator');
    }
}