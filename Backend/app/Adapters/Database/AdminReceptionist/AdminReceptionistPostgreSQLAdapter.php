<?php

namespace App\Adapters\Database\AdminReceptionist;

use App\Application\DTOs\AdminReceptionistDTO;
use App\Application\Ports\AdminReceptionist\AdminReceptionistRepositoryPort;
use App\Models\Collaborator;
use App\Models\UserTgi;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Facades\Log;


class AdminReceptionistPostgreSQLAdapter implements AdminReceptionistRepositoryPort {
    public function create(AdminReceptionistDTO $adminReceptionistDTO): ?Collaborator {
        try {
            return DB::transaction(function () use ($adminReceptionistDTO) {
                $userTgi = UserTgi::create([
                'nameuser' => $adminReceptionistDTO->phone,
                'fullname' => $adminReceptionistDTO->name,
                'passworduser' => $adminReceptionistDTO->password,
                'typeuser' => $adminReceptionistDTO->typecollaborator,
                'statususer' => 'Active',
                'birthdate' => $adminReceptionistDTO->birthDate->format('Y-m-d')
            ]);

            // log para ver se estou conseguindo acessar id_users
            Log::info('UserTgi created', ['id' => $userTgi->id_users]);

            $collaborator = Collaborator::create([
                'namecollaborator' => $adminReceptionistDTO->name,
                'typecollaborator' => $adminReceptionistDTO->typecollaborator,
                'fulladdress' => $adminReceptionistDTO->fulladdress,
                'hiring' => $adminReceptionistDTO->hiring->format('Y-m-d'),
                'classification' => $adminReceptionistDTO->classification,
                'Id_users' => $userTgi->id_users,
                'birthday' => $adminReceptionistDTO->birthDate->format('Y-m-d')
            ]);

            Log::info('Instructor and associated Collaborator created successfully', [
                'collaborator_id' => $collaborator->id,
                'user_tgi_id' => $userTgi->id_users
            ]);
                
                return $collaborator;
            });
        } catch (Exception $e) {
            Log::error('Failed to create collaborator', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'instructor_data' => [
                    'name' => $adminReceptionistDTO->name,
                    'phone' => $adminReceptionistDTO->phone,
                    'classification' => $adminReceptionistDTO->classification
                ]
            ]);
            
            throw $e;
        }
    }

    public function getEmployeeByLoginName(string $nameuser): array
    {
        try
        {
            $employee = UserTgi::where("nameuser", $nameuser)
            ->whereIn("typeuser", ["Administrator", "Receptionist"])
            ->first();
            if (!$employee)
                throw new Exception("Dados inválidos");
            return [
                'status' => true,
                'data' => $employee];
        }
        catch (Exception $e)
        {
            Log::error("". $e->getMessage());
            return ['status'=> false,'message'=> $e->getMessage()];
        }
    }

    public function getAllAdminReceptionists(): array
    {
        try {
            $collaborators = Collaborator::with('user')
                ->whereIn('typecollaborator', ['Administrator', 'Receptionist'])
                ->select('Id_collaborators', 'Id_users', 'typecollaborator', 'birthday', 'fulladdress', 'hiring', 'classification')
                ->get();

            if ($collaborators->isEmpty()) {
                return [];
            }

            return $collaborators->map(function ($collaborator) {
                $birthday = $collaborator->birthday 
                    ? \Carbon\Carbon::parse($collaborator->birthday)->format('d-m-Y')
                    : null;
                $hiring = $collaborator->hiring 
                    ? \Carbon\Carbon::parse($collaborator->hiring)->format('d-m-Y')
                    : null;

                return [
                    'id' => $collaborator->Id_collaborators,
                    'nome' => $collaborator->user->fullname,
                    'phone' => $collaborator->user->nameuser,
                    'birthday' => $birthday,
                    'fulladdress' => $collaborator->fulladdress,
                    'hiring' => $hiring,
                    'classification' => $collaborator->classification,
                    'type' => $collaborator->typecollaborator,
                ];
            })->toArray();

        } catch (Exception $e) {
            Log::error('Failed to get admin/receptionists', [
                'error' => $e->getMessage()
            ]);
            throw $e;
        }
    }
}
