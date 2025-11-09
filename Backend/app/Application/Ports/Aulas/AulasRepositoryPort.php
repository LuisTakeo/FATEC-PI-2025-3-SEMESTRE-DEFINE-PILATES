<?php

namespace App\Application\Ports\Aulas;

interface AulasRepositoryPort
{
    // Define service contract methods here
    public function getAulasTypes(): array;
}