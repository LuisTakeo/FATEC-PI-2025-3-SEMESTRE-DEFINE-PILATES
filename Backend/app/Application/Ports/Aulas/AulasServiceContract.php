<?php

namespace App\Application\Ports\Aulas;

use App\Application\DTOs\AulaDTO;

interface AulasServiceContract
{
    // Define service contract methods here
    public function listAulasTypes(): array;
    public function listStudios(): array;

    public function registerAula(AulaDTO $aulaDTO): array;

    public function listAulasByDay(?string $data = null, ?int $id_studio = null, ?int $id_instrutor = null): array;
}