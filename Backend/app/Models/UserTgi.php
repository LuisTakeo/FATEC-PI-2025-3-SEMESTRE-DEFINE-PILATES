<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class UserTgi extends Authenticatable implements JWTSubject
{
    use HasFactory;
    // use HasApiTokens;

    protected $table = 'users';
    protected $primaryKey = 'id_users'; 
    public $timestamps = true;

    protected $fillable = [
        'nameuser',
        'fullname',
        'passworduser',
        'typeuser',
        'statususer',
        'message_sent',
        'birthdate'
    ];

    protected $hidden = [
        'passworduser',
    ];

    protected $casts = [
        'message_sent' => 'boolean',
        'birthdate' => 'date',
    ];

    public function getFullNameAttribute()
    {
        return $this->attributes['fullname'] ?? 'Sem nome';
    }

    public function getAuthPasswordName()
    {
        return 'passworduser';
    }

    public function getAuthPassword()
    {
        return $this->passworduser;
    }

    // ✅ UserTgi pode ter UM Student (se typeuser = 'student')
    public function student(): HasOne
    {
        return $this->hasOne(
            Student::class, 
            'id_users', 
            'id_users'); // ✅ Filtro por tipo
    }

    // ✅ UserTgi pode ter UM Instructor (se typeuser = 'instructor')
    public function instructor(): HasOne
    {
        return $this->hasOne(
            Instructor::class, 'id_users', 'id_users');
    }

    // ✅ UserTgi pode ter UM Collaborator (se typeuser = 'collaborator')
    public function collaborator(): HasOne
    {
        return $this->hasOne(Collaborator::class, 'id_users', 'id_users');
    }

    // ✅ Método dinâmico para buscar o relacionamento correto
    public function getRelatedEntity()
    {
        return match($this->typeuser) {
            'Student' => $this->student,
            'Instructor' => $this->instructor,
            'Collaborator' => $this->collaborator,
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

    // ✅ JWT Methods
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        // ✅ Claims personalizados que vão no payload do JWT
        $claims = [
            'id' => $this->id_users,
            'loginuser' => $this->nameuser,
            'fullname' => $this->fullname,
            'typeuser' => $this->typeuser,
            'statususer' => $this->statususer,
        ];

        // ✅ Adicionar permissões baseadas no tipo
        $claims['permissions'] = $this->getPermissionsByType();

        // ✅ Adicionar dados específicos do tipo
        if ($this->typeuser === 'student' && $this->student) {
            $claims['student_id'] = $this->student->Id_students;
        } elseif ($this->typeuser === 'instructor' && $this->instructor) {
            $claims['instructor_id'] = $this->instructor->id_instructor;
        } elseif ($this->typeuser === 'collaborator' && $this->collaborator) {
            $claims['collaborator_id'] = $this->collaborator->id_collaborator;
            $claims['is_admin'] = true;
        }

        return $claims;
    }

    // ✅ Definir permissões por tipo de usuário
    private function getPermissionsByType(): array
    {
        return match($this->typeuser) {
            'student' => [
                'pages' => ['dashboard', 'profile', 'schedules', 'payments'],
                'actions' => ['view_profile', 'edit_profile', 'create_schedule', 'cancel_schedule', 'view_payments']
            ],
            'instructor' => [
                'pages' => ['dashboard', 'profile', 'classes', 'schedules', 'students'],
                'actions' => ['view_profile', 'edit_profile', 'create_class', 'edit_class', 'view_students', 'manage_schedules']
            ],
            'collaborator' => [
                'pages' => ['dashboard', 'admin', 'users', 'students', 'instructors', 'classes', 'schedules', 'payments', 'reports'],
                'actions' => ['*'] // Acesso total
            ],
            default => [
                'pages' => [],
                'actions' => []
            ]
        };
    }
}