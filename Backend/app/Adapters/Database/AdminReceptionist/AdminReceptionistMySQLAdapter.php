<?php

namespace App\Adapters\Database\AdminReceptionist;

use App\Application\DTOs\AdminReceptionistDTO;
use App\Application\Ports\AdminReceptionist\AdminReceptionistRepositoryPort;
use App\Models\Collaborator;
use App\Models\UserTgi;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Facades\Log;


class AdminReceptionistMySQLAdapter implements AdminReceptionistRepositoryPort {
    public function create(AdminReceptionistDTO $adminReceptionistDTO): ?Collaborator {
        try {
            return DB::transaction(function () use ($adminReceptionistDTO) {
                $userTgi = UserTgi::create([
                'nameuser' => $adminReceptionistDTO->phone,
                'passworduser' => $adminReceptionistDTO->password,
                'typeuser' => strtolower($adminReceptionistDTO->typecollaborator),
                'statususer' => 'active',
                'birthdate' => $adminReceptionistDTO->birthDate->format('Y-m-d')
            ]);

            $collaborator = Collaborator::create([
                'namecollaborator' => $adminReceptionistDTO->name,
                'typecollaborator' => $adminReceptionistDTO->typecollaborator,
                'fulladdress' => $adminReceptionistDTO->fulladdress,
                'hiring' => $adminReceptionistDTO->hiring->format('Y-m-d'),
                'classification' => $adminReceptionistDTO->classification,
                'Id_users' => $userTgi->Id_users,
            ]);

            Log::info('Instructor and associated Collaborator created successfully', [
                'collaborator_id' => $collaborator->id,
                'user_tgi_id' => $userTgi->Id_users
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
}