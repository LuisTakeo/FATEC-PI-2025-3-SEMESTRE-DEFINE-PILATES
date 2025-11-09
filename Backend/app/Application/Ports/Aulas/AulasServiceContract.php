<?php

namespace App\Application\Ports\Aulas;

interface AulasServiceContract
{
    // Define service contract methods here
    public function listAulasTypes(): array;
}