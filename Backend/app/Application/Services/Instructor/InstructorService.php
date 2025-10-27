<?php

namespace App\Application\Services\Instructor;

use App\Application\DTOs\InstructorDTO;
use App\Application\Ports\NoSQLPort;
use App\Application\Ports\Instructor\InstructorRepositoryPort;
use App\Application\Ports\Instructor\InstructorServiceContract;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class InstructorService implements InstructorServiceContract
{
    private InstructorRepositoryPort $sqlAdapter;
    private NoSQLPort $noSQLAdapter;

  /**
 * @OA\Post(
 * path="/api/instructors/save",
 * tags={"Instructors"},
 * summary="Register a new instructor/collaborator",
 * description="Create a new instructor account with their professional and personal data",
 * @OA\RequestBody(
 * required=true,
 * description="Instructor registration data",
 * @OA\JsonContent(
 * required={"name", "phone", "password", "birth_date", "hiring", "classification", "fulladdress"},
 * @OA\Property(property="name", type="string", maxLength=255, example="Carlos Andrade"),
 * @OA\Property(property="phone", type="string", pattern="^(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$", example="(11) 98765-4321"),
 * @OA\Property(property="password", type="string", minLength=8, example="strongPassword123"),
 * @OA\Property(property="birth_date", type="string", format="date", description="Format: d-m-Y", example="15-08-1990"),
 * @OA\Property(property="hiring", type="string", format="date", description="Format: d-m-Y. Hiring date.", example="01-02-2023"),
 * @OA\Property(property="fulladdress", type="string", maxLength=255, description="Endereço completo (Rua, Número, Bairro, Cidade - UF)", example="Avenida Paulista, 1000, Bela Vista, São Paulo - SP"),
 * @OA\Property(property="classification", type="string", maxLength=1, description="Instructor classification (e.g., A, B, C)", example="A"),
 * @OA\Property(property="cref", type="string", maxLength=20, nullable=true, description="CREF number (optional)", example="123456-G/SP"),
 * @OA\Property(property="crefito", type="string", maxLength=20, nullable=true, description="CREFITO number (optional)", example="98765-FTO")
 * )
 * ),
 * @OA\Response(
 * response=201,
 * description="Instructor registered successfully",
 * @OA\JsonContent(
 * @OA\Property(property="message", type="string", example="Instructor registered successfully"),
 * @OA\Property(property="status", type="string", example="success"),
 * @OA\Property(
 * property="data",
 * type="object",
 * @OA\Property(property="id", type="integer", example=1),
 * @OA\Property(property="name", type="string", example="Carlos Andrade"),
 * @OA\Property(property="phone", type="string", example="11987654321"),
 * @OA\Property(property="birth_date", type="string", example="15-08-1990"),
 * @OA\Property(property="hiring", type="string", example="01-02-2023"),
 * @OA\Property(property="fulladdress", type="string", example="Avenida Paulista, 1000, Bela Vista, São Paulo - SP"),
 * @OA\Property(property="classification", type="string", example="A"),
 * @OA\Property(property="cref", type="string", nullable=true, example="123456-G/SP"),
 * @OA\Property(property="crefito", type="string", nullable=true, example="98765-FTO")
 * )
 * )
 * ),
 * @OA\Response(
 * response=422,
 * description="Validation error or business rule violation",
 * @OA\JsonContent(
 * @OA\Property(property="message", type="string", example="Instructor registration failed"),
 * @OA\Property(property="status", type="string", example="error"),
 * @OA\Property(property="error", type="string", example="The fulladdress field is required.")
 * )
 * ),
 * @OA\Response(
 * response=500,
 * description="Internal server error",
 * @OA\JsonContent(
 * @OA\Property(property="message", type="string", example="An unexpected error occurred"),
 * @OA\Property(property="status", type="string", example="error"),
 * @OA\Property(property="error", type="string", example="Internal server error")
 * )
 * )
 * )
 */

   public function __construct(
        InstructorRepositoryPort $sqlAdapter,
        NoSQLPort $noSQLAdapter
    ) {
        $this->sqlAdapter = $sqlAdapter;
        $this->noSQLAdapter = $noSQLAdapter;
    }

    /**
     * Registers a new instructor in the system.
     *
     * @param InstructorDTO $instructorDTO
     * @return array
     */
    public function registerInstructor(InstructorDTO $instructorDTO): array
    {
        try {
            $instructorDTOFiltered = $this->sanitizeInstructorData($instructorDTO);

            $savedInstructor = $this->sqlAdapter->create($instructorDTOFiltered);

            if (!$savedInstructor) {
                throw new Exception();
            }

            return [
                'message' => 'Instructor registered successfully',
                'status' => 'success'
            ];

        } catch (Exception $e) {
            Log::error('Error registering instructor: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return [
                'message' => 'An unexpected error occurred while registering the instructor.',
                'error' => $e->getMessage(),
                'status' => 'error'
            ];
        }
    }

    /**
     * Sanitizes the instructor data from the DTO.
     *
     * @param InstructorDTO $dto
     * @return InstructorDTO
     */
    private function sanitizeInstructorData(InstructorDTO $dto): InstructorDTO
    {
        return new InstructorDTO(
            id: $dto->id,
            name: Str::title(trim(strip_tags($dto->name))),
            phone: preg_replace('/[^0-9]/', '', $dto->phone),
            password: password_hash($dto->password, PASSWORD_DEFAULT),
            birthDate: $dto->birthDate,
            hiring: $dto->hiring,
            cref: $dto->cref,
            crefito: $dto->crefito,
            fulladdress: $dto->fulladdress,
            classification: strtoupper(trim(strip_tags($dto->classification)))
        );
    }
} 