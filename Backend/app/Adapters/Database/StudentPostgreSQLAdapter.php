<?php

namespace App\Adapters\Database;

use App\Application\DTOs\StudentDTO;
use App\Application\Ports\StudentRepositoryPort;
use App\Models\ProfessionClassification;
use App\Models\Student;
use App\Models\UserTgi;
use DB;
use Exception;
use Hash;
use Log;

class StudentPostgreSQLAdapter implements StudentRepositoryPort
{
    
    public function __construct()
    {
        // Inject dependencies here
    }

    public function getStudentsFromDB() {
        try {
            $student = UserTgi::where("typeuser", "Student")->get();
            return $student;
        }
        catch(Exception $e) {
            Log::error("Failed to retrieve students", ['error' => $e->getMessage()]);
            return [];

        }
    }

    public function getStudentByLoginName(String $nameuser) : array
    {
        try
        {
            $student = UserTgi::where("nameuser", $nameuser)->first();
            if (!$student)
                throw new Exception("Dados inválidos");
            return [
                'status' => true,
                'data' => $student];
        }
        catch (Exception $e)
        {
            Log::error("". $e->getMessage());
            return ['status'=> false,'message'=> $e->getMessage()];
        }
    }


    public function create(StudentDTO $studentDTO): array
    {
        try {
            return DB::transaction(function () use ($studentDTO) {                
                $professionClassId = $this->getOrCreateProfessionClassification($studentDTO->profession);
                
                $hashedPassword = Hash::make($studentDTO->password);

                $userTgi = UserTgi::create([
                    'nameuser' => $studentDTO->phone,
                    'fullname' => $studentDTO->name,        
                    'passworduser' => $hashedPassword,
                    'typeuser' => 'Student',
                    'statususer' => 'Active',
                    'message_sent' => false,
                    'birthdate' => $studentDTO->birthDate->format('Y-m-d') // Formato para banco
                ]);
                
                Log::info('UserTgi created', ['id' => $userTgi->id_users]);
                
                // ✅ 3. Criar Student
                $student = Student::create([
                    'namestudent' => $studentDTO->name,
                    'cpf' => $studentDTO->cpf,
                    'Id_classprofessions' => $professionClassId,
                    'id_users' => $userTgi->id_users,
                ]);
                
                Log::info('Student created', [
                    'id' => $student->Id_students,
                    'user_id' => $userTgi->id_users
                ]);
                
                return [
                    'status' => true, 
                    'id' => $student->Id_students,
                    'id_user' => $userTgi->id_users
                ];  
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

    /**
     * Busca todos os usuários do tipo student com dados relacionados
     * Traz apenas os campos necessários para otimizar a query
     */
    public function getAllStudentUsers(): array
    {
        try {
            $students = UserTgi::where('typeuser', 'Student')
                ->select(['id_users', 'fullname', 'nameuser', 'typeuser', 'birthdate'])
                ->with('student:Id_students,id_users,cpf,Id_classprofessions')
                ->get();
            
            return [
                'status' => true,
                'data' => $students
            ];
        } catch (Exception $e) {
            Log::error('Failed to retrieve student users', ['error' => $e->getMessage()]);
            return [
                'status' => false,
                'message' => $e->getMessage()
            ];
        }
    }
}
