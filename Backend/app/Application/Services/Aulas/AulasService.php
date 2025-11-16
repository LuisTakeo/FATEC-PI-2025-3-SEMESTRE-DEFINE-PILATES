<?php

namespace App\Application\Services\Aulas;

use App\Application\DTOs\AulaDTO;
use App\Application\Ports\Aulas\AulasRepositoryPort;
use App\Application\Ports\Aulas\AulasServiceContract;

class AulasService implements AulasServiceContract
{
    private AulasRepositoryPort $aulasRepository;

    public function __construct(AulasRepositoryPort $aulasRepository)
    {
        $this->aulasRepository = $aulasRepository;
    }

    public function listAulasTypes(): array
    {
        try {
            $aulasTypes = $this->aulasRepository->getAulasTypes();

            return [
                'status' => 'success',
                'data' => $aulasTypes
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'message' => 'Failed to list aulas types'
            ];
        }
    }

    public function listStudios(): array
    {
        try {
            $studios = $this->aulasRepository->getStudios();

            return [
                'status' => 'success',
                'data' => $studios
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'message' => 'Failed to list studios'
            ];
        }
    }

    public function registerAula(AulaDTO $aulaDTO): array
    {
        try {
            $this->aulasRepository->saveAula($aulaDTO);
            return [
                'status' => 'success',
                'message' => 'Aula registered successfully',
                'data' => $aulaDTO->toArray()
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }

    public function listAulasByDay(?string $data = null, ?int $id_studio = null, ?int $id_instrutor = null): array
    {
        // Implement the logic to list aulas with filters
        try {
            // Converte data de DD-MM-YYYY para YYYY-MM-DD se fornecida
            $dataFormatted = null;
            if ($data) {
                $dataObj = \DateTime::createFromFormat('d-m-Y', $data);
                if ($dataObj) {
                    $dataFormatted = $dataObj->format('Y-m-d');
                } else {
                    return [
                        'status' => 'error',
                        'message' => 'Formato de data inválido. Use DD-MM-YYYY'
                    ];
                }
            }

            $aulas = $this->aulasRepository->getAulasByDay($dataFormatted, $id_studio, $id_instrutor);

            return [
                'status' => 'success',
                'message' => 'Aulas encontradas com sucesso',
                'data' => $aulas
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'message' => 'Falha ao listar aulas'
            ];
        }
    }

    public function listAulasByStudent(int $id_student): array
    {
        try {
            $aulas = $this->aulasRepository->getAulasByStudent($id_student);

            return [
                'status' => 'success',
                'message' => 'Aulas do aluno encontradas com sucesso',
                'data' => $aulas
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'message' => 'Falha ao listar aulas do aluno'
            ];
        }
    }

    public function enrollStudentInAula(int $id_student, int $id_aula): array
    {
        try {
            $enrolled = $this->aulasRepository->enrollStudentInAula($id_student, $id_aula);

            if ($enrolled) {
                return [
                    'status' => 'success',
                    'message' => 'Aluno cadastrado na aula com sucesso',
                    'data' => [
                        'id_student' => $id_student,
                        'id_aula' => $id_aula
                    ]
                ];
            }

            return [
                'status' => 'error',
                'message' => 'Falha ao cadastrar aluno na aula'
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }

    public function listAvailableAulasForStudent(int $id_student): array
    {
        try {
            $aulas = $this->aulasRepository->getAvailableAulasForStudent($id_student);

            return [
                'status' => 'success',
                'message' => 'Aulas disponíveis encontradas com sucesso',
                'data' => $aulas
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'message' => 'Falha ao listar aulas disponíveis'
            ];
        }
    }
}