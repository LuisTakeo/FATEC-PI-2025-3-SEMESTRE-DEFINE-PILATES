<?php

namespace App\Application\Ports;

/**
 * Port principal da aplicação - define casos de uso
 * Esta é a interface que os Controllers vão usar
 */
interface ApplicationPort
{
    // Interface limpa para implementação futura
    public function createUser() : User;
}
