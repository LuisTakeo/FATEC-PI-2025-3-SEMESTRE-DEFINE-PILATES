<?php

namespace App\Application\Ports;

/**
 * Port principal da aplicação - define casos de uso
 * Esta é a interface que os Controllers vão usar
 */
interface ApplicationPort
{
    // User use cases
    public function createUser(array $userData): array;
    public function getUserById(int $id): ?array;
    public function getAllUsers(): array;
    public function updateUser(int $id, array $userData): ?array;
    public function deleteUser(int $id): bool;

    // PilatesClass use cases
    public function createPilatesClass(array $classData): array;
    public function getPilatesClassById(int $id): ?array;
    public function getAllPilatesClasses(): array;
    public function updatePilatesClass(int $id, array $classData): ?array;
    public function deletePilatesClass(int $id): bool;

    // Business logic methods
    public function bookUserToClass(int $userId, int $classId): bool;
    public function getClassesByUser(int $userId): array;
    public function getAvailableClasses(): array;
}
