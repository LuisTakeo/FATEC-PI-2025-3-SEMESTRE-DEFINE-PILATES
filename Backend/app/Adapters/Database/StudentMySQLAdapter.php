<?php

namespace App\Adapters\Database;

use App\Application\DTOs\StudentDTO;
use App\Application\Ports\StudentRepositoryPort;
use App\Models\ProfessionClassification;
use App\Models\Student;
use App\Models\UserTgi;
use Log;

class StudentMySQLAdapter implements StudentRepositoryPort
{
    
    public function __construct()
    {
        // Inject dependencies here
    }

    public function create(StudentDTO $studentDTO): bool
    {
        try {
            return DB::transaction(function () use ($studentDTO) {
                
                // ✅ 1. Buscar ou criar ProfessionClassification
                $professionClassId = $this->getOrCreateProfessionClassification($studentDTO->profession);
                
                // ✅ 2. Criar UserTgi (telefone como login)
                $userTgi = UserTgi::create([
                    'nameuser' => $studentDTO->phone,        // Telefone como login
                    'passworduser' => $studentDTO->password, // Senha já hasheada
                    'typeuser' => 'student',                 // Tipo fixo
                    'statususer' => 'active',                // Status padrão
                    'message_sent' => null,                  // Padrão null
                    'birthdate' => $studentDTO->birthDate->format('Y-m-d') // Formato para banco
                ]);
                
                Log::info('UserTgi created', ['id' => $userTgi->Id_users]);
                
                // ✅ 3. Criar Student
                $student = Student::create([
                    'namestudent' => $studentDTO->name,
                    'cpf' => $studentDTO->cpf,
                    'Id_classprofessions' => $professionClassId
                ]);
                
                Log::info('Student created', [
                    'id' => $student->Id_students,
                    'user_id' => $userTgi->Id_users
                ]);
                
                return true;
            });
            
        } catch (\Exception $e) {
            Log::error('Failed to create student', [
                'error' => $e->getMessage(),
                'student_data' => [
                    'name' => $studentDTO->name,
                    'phone' => $studentDTO->phone,
                    'cpf' => $studentDTO->cpf
                ]
            ]);
            
            return false;
        }
    }
    
    /**
     * Busca ou cria uma classificação profissional
     */
    private function getOrCreateProfessionClassification(string $profession): int
    {
        $professionClass = ProfessionClassification::firstOrCreate(
            ['classifications' => $profession]
        );
        
        return $professionClass->Id_classprofessions;
    }
}
