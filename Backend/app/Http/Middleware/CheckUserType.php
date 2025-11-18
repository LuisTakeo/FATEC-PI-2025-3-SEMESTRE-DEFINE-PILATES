<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserType
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  ...$types  Tipos de usuário permitidos (student, instructor, collaborator)
     */
    public function handle(Request $request, Closure $next, string ...$types): Response
    {
        $user = auth()->user();
        
        // Se não está autenticado, auth:api já bloqueou antes
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Usuário não autenticado'
            ], 401);
        }
        
        // Verifica se o tipo do usuário está na lista permitida
        if (!in_array($user->typeuser, $types)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Acesso negado. Você não tem permissão para acessar este recurso.',
                'required_types' => $types,
                'your_type' => $user->typeuser
            ], 403);
        }
        
        return $next($request);
    }
}
