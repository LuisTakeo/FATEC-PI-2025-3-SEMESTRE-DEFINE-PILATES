<?php

namespace App\Application\Services\AdminReceptionist;

use App\Application\DTOs\AdminReceptionistDTO;
use App\Application\Ports\AdminReceptionist\AdminReceptionistRepositoryPort;
use App\Application\Ports\AdminReceptionist\AdminReceptionistServiceContract;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class AdminReceptionistService implements AdminReceptionistServiceContract
{
    private AdminReceptionistRepositoryPort $repository;

  /**
 * @OA\Post(
 * path="/api/admin_receptionist/save",
 * tags={"AdminReceptionist"},
 * summary="Register a new Administrator or Receptionist",
 * description="Create a new collaborator account for an Administrator or Receptionist.",
 * @OA\RequestBody(
 * required=true,
 * description="Admin/Receptionist registration data",
 * @OA\JsonContent(
 * required={"name", "phone", "password", "birth_date", "hiring", "classification", "fulladdress", "typecollaborator"},
 * @OA\Property(property="name", type="string", maxLength=255, example="Ana Beatriz"),
 * @OA\Property(property="phone", type="string", pattern="^(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$", example="(11) 98765-4321"),
 * @OA\Property(property="password", type="string", minLength=6, example="strongPassword123"),
 * @OA\Property(property="birth_date", type="string", format="date", description="Format: d-m-Y", example="15-08-1990"),
 * @OA\Property(property="hiring", type="string", format="date", description="Format: d-m-Y. Hiring date.", example="01-02-2023"),
 * @OA\Property(property="fulladdress", type="string", maxLength=255, description="Endereço completo (Rua, Número, Bairro, Cidade - UF)", example="Avenida Paulista, 1000, Bela Vista, São Paulo - SP"),
 * @OA\Property(property="classification", type="string", maxLength=1, description="Collaborator classification (e.g., A, B, C)", example="A"),
 * @OA\Property(property="typecollaborator", type="string", enum={"Administrador", "Recepcionista"}, example="Recepcionista")
 * )
 * ),
 * @OA\Response(
 * response=201,
 * description="Collaborator registered successfully",
 * @OA\JsonContent(
 * @OA\Property(property="message", type="string", example="Collaborator registered successfully"),
 * @OA\Property(property="status", type="string", example="success"),
 * @OA\Property(
 * property="data",
 * type="object",
 * @OA\Property(property="id", type="integer", example=1),
 * @OA\Property(property="name", type="string", example="Ana Beatriz"),
 * @OA\Property(property="phone", type="string", example="11987654321"),
 * @OA\Property(property="birth_date", type="string", example="15-08-1990"),
 * @OA\Property(property="hiring", type="string", example="01-02-2023"),
 * @OA\Property(property="fulladdress", type="string", example="Avenida Paulista, 1000, Bela Vista, São Paulo - SP"),
 * @OA\Property(property="classification", type="string", example="A"),
 * @OA\Property(property="typecollaborator", type="string", example="Recepcionista")
 * )
 * )
 * ),
 * @OA\Response(
 * response=422,
 * description="Validation error",
 * @OA\JsonContent(
 * @OA\Property(property="message", type="string", example="Falha ao validar os campos."),
 * @OA\Property(property="status", type="string", example="error"),
 * @OA\Property(property="error", type="object", example={"typecollaborator": {"O tipo de colaborador deve ser Administrador ou Recepcionista."}})
 * )
 * ),
 * @OA\Response(
 * response=500,
 * description="Internal server error",
 * @OA\JsonContent(
 * @OA\Property(property="message", type="string", example="An unexpected error occurred while registering the collaborator."),
 * @OA\Property(property="status", type="string", example="error"),
 * @OA\Property(property="error", type="string", example="SQLSTATE[HY000]: General error...")
 * )
 * )
 * )
 */
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
}