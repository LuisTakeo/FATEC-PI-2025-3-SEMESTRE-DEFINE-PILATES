<?php

namespace App\Application\Services\AdminReceptionist;

use App\Application\DTOs\AdminReceptionistDTO;
use App\Application\Ports\AdminReceptionist\AdminReceptionistRepositoryPort;
use App\Application\Ports\AdminReceptionist\AdminReceptionistServiceContract;
use Exception;
use Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;

class AdminReceptionistService implements AdminReceptionistServiceContract
{
    private AdminReceptionistRepositoryPort $repository;

    public function __construct(AdminReceptionistRepositoryPort $repository) {
        $this->repository = $repository;
    }

    /**
     * Registers a new Administrator or Receptionist.
     *
     * @param AdminReceptionistDTO $adminReceptionistDTO
     * @return array
     */
    public function registerAdminReceptionist(AdminReceptionistDTO $adminReceptionistDTO): array
    {
        try {
            $dtoFiltered = $this->sanitizeAdminReceptionistData($adminReceptionistDTO);

            $this->repository->create($dtoFiltered);

            //??
            
            return [
                'message' => 'Collaborator registered successfully',
                'status' => 'success',
            ];

        } catch (Exception $e) {
            Log::error('Error registering collaborator: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return [
                'message' => 'An unexpected error occurred while registering the collaborator.',
                'error' => $e->getMessage(),
                'status' => 'error'
            ];
        }
    }

    private function sanitizeAdminReceptionistData(AdminReceptionistDTO $dto): AdminReceptionistDTO
    {
        return new AdminReceptionistDTO(
            id: $dto->id,
            name: Str::title(trim(strip_tags($dto->name))),
            phone: preg_replace('/[^0-9]/', '', $dto->phone),
            password: password_hash($dto->password, PASSWORD_DEFAULT),
            birthDate: $dto->birthDate,
            hiring: $dto->hiring,
            typecollaborator: $dto->typecollaborator,
            fulladdress: $dto->fulladdress,
            classification: strtoupper(trim(strip_tags($dto->classification)))
        );
    }

    public function loginAdminReceptionist(string $nameuser, string $password): array{
        $responseUser = $this->repository->getEmployeeByLoginName($nameuser);
        if ($responseUser["status"] == false)
            return ["status"=> false,
                "message"=> "error",
                "error" => "Usuário ou senha inválidos"
            ];

        $userData = $responseUser["data"];
        $isPasswordValid = Hash::check($password, $userData->getAuthPassword());
        if (! $isPasswordValid)
        {
            return ["status"=> false,
            "message"=> "error",
            "error"=> "Usuário ou senha inválidos"
            ];
        }
        // 3. Verificar status
            if ($userData->statususer !== 'Active') {
                return [
                    'status' => false,
                    'message' => 'error',
                    'error' => 'Usuário inativo'
                ];
            }

            // 4. Carregar dados do colaborador
            $collaborator = $userData->collaborator;

            if (!$collaborator) {
                return [
                    'status' => false,
                    'message' => 'error',
                    'error' => 'Dados do colaborador não encontrados',
                    'test' => $userData->toArray()
                ];
            }

            $token = JWTAuth::fromUser($userData);

            $payload = JWTAuth::setToken($token)->getPayload();
            // 6. Retornar dados (SEM senha)
            return [
                'status' => true,
                'message' => 'Login realizado com sucesso',
                'data' => [
                    'user' => [
                        'id' => $collaborator->Id_collaborators,
                        'nameuser' => $userData->nameuser,
                        'fullname' => $userData->fullname,
                        'type' => $userData->typeuser,
                        'status' => $userData->statususer,
                    ],
                    'collaborator' => [
                        'role' => $collaborator->typecollaborator,
                    ],
                    'token' => $token, // ✅ Token JWT-like
                    'token_type' => 'Bearer'
                ]
            ];
    }

    public function getAllAdminReceptionists(): array
    {
        try {
            return $this->repository->getAllAdminReceptionists();
        } catch (Exception $e) {
            Log::error('Error fetching admin/receptionists: ' . $e->getMessage());
            throw $e;
        }
    }
}