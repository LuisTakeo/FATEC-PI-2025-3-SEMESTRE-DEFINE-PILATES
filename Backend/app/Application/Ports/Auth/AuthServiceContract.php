<?php

namespace App\Application\Ports\Auth;

interface AuthServiceContract
{
    /**
     * Retorna os dados do usuário autenticado
     * 
     * @return array
     */
    public function getCurrentUser(): array;

    /**
     * Faz logout do usuário (invalida o token atual)
     * 
     * @return array
     */
    public function logout(): array;

    /**
     * Renova o token JWT do usuário
     * 
     * @return array
     */
    public function refreshToken(): array;
}
