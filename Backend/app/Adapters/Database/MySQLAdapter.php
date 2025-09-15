<?php

namespace App\Adapters\Database;

use App\Application\Ports\SQLPort;
use Illuminate\Support\Facades\DB;

/**
 * Adapter para MySQL usando Laravel Query Builder/Eloquent
 * Implementa SQLPort para operações em banco relacional
 */
class MySQLAdapter implements SQLPort
{
    public function __construct()
    {
        // Inicialização, se necessário
    }
}
