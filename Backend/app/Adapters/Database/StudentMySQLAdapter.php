<?php

namespace App\Adapters\Database;

use App\Application\DTOs\StudentDTO;
use App\Application\Ports\StudentRepositoryPort;
use App\Models\ProfessionClassification;
use App\Models\Student;
use App\Models\UserTgi;
use DB;
use Exception;
use Log;

class StudentMySQLAdapter implements StudentRepositoryPort
{
    
    public function __construct()
    {
        // Inject dependencies here
    }


    public function create(StudentDTO $studentDTO): array
    {
        try {
            return DB::transaction(function () use ($studentDTO) {                
                $professionClassId = $this->getOrCreateProfessionClassification($studentDTO->profession);
                
                $userTgi = UserTgi::create([
                    'nameuser' => $studentDTO->phone,        
                    'passworduser' => $studentDTO->password,
                    'typeuser' => 'student',
                    'statususer' => 'active',
                    'message_sent' => false,
                    'birthdate' => $studentDTO->birthDate->format('Y-m-d') // Formato para banco
                ]);
                
                Log::info('UserTgi created', ['id' => $userTgi->Id_users]);
                
                // ✅ 3. Criar Student
                $student = Student::create([
                    'namestudent' => $studentDTO->name,
                    'cpf' => $studentDTO->cpf,
                    'Id_classprofessions' => $professionClassId,
                    'Id_users' => $userTgi->Id_users,
                ]);
                
                Log::info('Student created', [
                    'id' => $student->Id_students,
                    'user_id' => $userTgi->Id_users
                ]);
                
                return ['status' => true, 'id' => $student->Id_students];  
            });
            
        } catch (Exception $e) {
            Log::error('Failed to create student', [
                'error' => $e->getMessage(),
                'student_data' => [
                    'name' => $studentDTO->name,
                    'phone' => $studentDTO->phone,
                    'cpf' => $studentDTO->cpf
                ]
            ]);
            
            return ['status'=> false,''=> $e->getMessage()];
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
