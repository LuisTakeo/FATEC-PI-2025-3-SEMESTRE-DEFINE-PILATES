<?php

namespace App\Application\Services\Aulas;

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
}