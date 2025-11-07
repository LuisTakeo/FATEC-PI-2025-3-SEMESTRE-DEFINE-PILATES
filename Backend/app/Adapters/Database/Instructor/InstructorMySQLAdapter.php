<?php

namespace App\Adapters\Database\Instructor;

use App\Application\DTOs\InstructorDTO;
use App\Application\Ports\Instructor\InstructorRepositoryPort;
use App\Models\Collaborator;
use App\Models\Instructor;
use App\Models\UserTgi;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Facades\Log;

class InstructorMySQLAdapter implements InstructorRepositoryPort
{
    public function create(InstructorDTO $instructorDTO): ?Instructor
    {
        try {
            return DB::transaction(function () use ($instructorDTO) {
                
                $userTgi = UserTgi::create([
                'nameuser' => $instructorDTO->phone,
                'fullname' => $instructorDTO->name,
                'passworduser' => $instructorDTO->password,
                'typeuser' => 'instructor',
                'statususer' => 'active',
                'birthdate' => $instructorDTO->birthDate->format('Y-m-d')
            ]);

            $collaborator = Collaborator::create([
                'namecollaborator' => $instructorDTO->name,
                'typecollaborator' => 'Instructor',
                'fulladdress' => $instructorDTO->fulladdress,
                'hiring' => $instructorDTO->hiring->format('Y-m-d'),
                'classification' => $instructorDTO->classification,
                'Id_users' => $userTgi->id_users,
            ]);

            $instructor = Instructor::create([
                'hiring' => $instructorDTO->hiring->format('Y-m-d'),
                'classification' => $instructorDTO->classification,
                'cref' => $instructorDTO->cref,
                'crefito' => $instructorDTO->crefito,
                'Id_users' => $userTgi->id_users,
                'Id_collaborators' => $collaborator->Id_collaborators,
            ]);

            Log::info('Instructor and associated Collaborator created successfully', [
                'instructor_id' => $instructor->Id_instructors,
                'collaborator_id' => $collaborator->Id_collaborators,
                'user_tgi_id' => $userTgi->id_users
            ]);
                
                return $instructor;
            });

        } catch (Exception $e) {
            Log::error('Failed to create instructor', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'instructor_data' => [
                    'name' => $instructorDTO->name,
                    'phone' => $instructorDTO->phone,
                    'classification' => $instructorDTO->classification
                ]
            ]);
            
            throw $e;
        }
    }

    public function getInstructorByLoginName(String $nameuser) : array
    {
        try
        {
            $instructor = UserTgi::where("nameuser", $nameuser)
            ->whereIn("typeuser", ["Instructor"])
            ->first();
            if (!$instructor)
                throw new Exception("Dados inválidos");
            return [
                'status' => true,
                'data' => $instructor];
        }
        catch (Exception $e)
        {
            Log::error("". $e->getMessage());
            return ['status'=> false,'message'=> $e->getMessage()];
        }
    }
    
}
