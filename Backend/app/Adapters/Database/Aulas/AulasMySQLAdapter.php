<?php

namespace App\Adapters\Database\Aulas;

use App\Application\Ports\Aulas\AulasRepositoryPort;
use App\Models\TypeClass;

class AulasMySQLAdapter implements AulasRepositoryPort
{
    public function getAulasTypes(): array
    {
        $aulasTypes = TypeClass::all();
        if (!$aulasTypes) {
            return [];
        }

        $aulasTypes = collect($aulasTypes);
        $aulasTypes = $aulasTypes->map(function ($item) {
            return [
                'id' => $item->Id_type_classes,
                'type' => $item->typeclass,
            ];
        });
        return $aulasTypes->toArray();
    }
}