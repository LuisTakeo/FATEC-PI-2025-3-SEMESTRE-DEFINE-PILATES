<?php

namespace App\Application\Ports\Aulas;

use App\Application\DTOs\AulaDTO;

interface AulasServiceContract
{
    // Define service contract methods here
    public function listAulasTypes(): array;
    public function listStudios(): array;

    public function registerAula(AulaDTO $aulaDTO): array;
}