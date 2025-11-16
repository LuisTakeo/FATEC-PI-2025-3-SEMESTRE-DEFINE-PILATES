<?php

namespace App\Application\Ports\Aulas;

use App\Application\DTOs\AulaDTO;

interface AulasRepositoryPort
{
    // Define service contract methods here
    public function getAulasTypes(): array;
    public function getStudios(): array;

    public function saveAula(AulaDTO $aulaDTO): bool;
}