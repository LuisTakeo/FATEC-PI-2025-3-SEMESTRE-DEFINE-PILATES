<?php

namespace App\Application\Services\Auth;

use App\Application\Ports\Auth\AuthServiceContract;
use Exception;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService implements AuthServiceContract
{
    /**
     * Retorna os dados do usuário autenticado
     * 
     * @return array
     */
    public function getCurrentUser(): array
    {
        try {
            $user = auth()->user();
            
            if (!$user) {
                throw new Exception('Usuário não autenticado');
            }

            // Carrega relacionamento baseado no tipo de usuário
            $relatedEntity = $user->getRelatedEntity();
            // quero guardar o Id_ dependendo do tipo de user
            $entityId = null;
            Log::info('Related entity fetched', ['entity' => $relatedEntity]);
            Log::info('User type', ['type' => $user->typeuser]);
            switch($user->typeuser) {
                case 'Student':
                    $entityId = $relatedEntity->Id_students;
                    break;
                case 'Instructor':
                    $entityId = $relatedEntity->Id_instructors;
                    break;
                case 'Collaborator':
                    $entityId = $relatedEntity->Id_collaborators;
                    break;
            }
            return [
                'status' => 'success',
                'message' => 'Usuário autenticado',
                'data' => [
                    'user' => [
                        'id' => $entityId,
                        'login' => $user->nameuser,
                        'name' => $user->fullname,
                        'type' => $user->typeuser,
                        'status' => $user->statususer,
                    ],
                    'permissions' => $user->getJWTCustomClaims()['permissions'],
                    'entity' => $relatedEntity ? $this->formatEntity($relatedEntity, $user->typeuser) : null
                ]
            ];
        } catch (Exception $e) {
            Log::error('Erro ao buscar usuário atual', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return [
                'status' => 'error',
                'message' => 'Erro ao buscar dados do usuário',
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Faz logout do usuário (invalida o token atual)
     * 
     * @return array
     */
    public function logout(): array
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            
            return [
                'status' => 'success',
                'message' => 'Logout realizado com sucesso'
            ];
        } catch (Exception $e) {
            Log::error('Erro ao fazer logout', [
                'error' => $e->getMessage()
            ]);
            
            return [
                'status' => 'error',
                'message' => 'Erro ao fazer logout',
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Renova o token JWT do usuário
     * 
     * @return array
     */
    public function refreshToken(): array
    {
        try {
            $newToken = JWTAuth::refresh(JWTAuth::getToken());
            
            return [
                'status' => 'success',
                'message' => 'Token renovado com sucesso',
                'data' => [
                    'token' => $newToken,
                    'token_type' => 'Bearer'
                ]
            ];
        } catch (Exception $e) {
            Log::error('Erro ao renovar token', [
                'error' => $e->getMessage()
            ]);
            
            return [
                'status' => 'error',
                'message' => 'Erro ao renovar token',
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Formata os dados da entidade relacionada baseado no tipo de usuário
     * 
     * @param mixed $entity
     * @param string $type
     * @return array
     */
    private function formatEntity($entity, string $type): array
    {
        return match($type) {
            'Student' => [
                'id' => $entity->Id_students,
                'cpf' => $entity->cpf,
                'profession' => $entity->profession,
                'birth_date' => $entity->birth_date
            ],
            'Instructor' => [
                'id' => $entity->Id_instructors,
                'CREF' => $entity->cref ?? null,
                'CREFITO' => $entity->crefito ?? null,
                'classification' => $entity->classification ?? null
            ],
            'Collaborator' => [
                'id' => $entity->Id_collaborators,
                'role' => $entity->role ?? null,
                'is_admin' => true
            ],
            default => []
        };
    }
}
