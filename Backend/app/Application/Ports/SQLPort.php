<?php

namespace App\Application\Ports;

/**
 * Port para acesso a dados relacionais (MySQL)
 * Define operações CRUD para dados estruturados
 */
interface SQLPort
{
    // Generic CRUD operations
    public function create(string $table, array $data): array;
    public function findById(string $table, int $id): ?array;
    public function findAll(string $table, array $conditions = []): array;
    public function update(string $table, int $id, array $data): ?array;
    public function delete(string $table, int $id): bool;

    // Specific user operations
    public function findUserByEmail(string $email): ?array;
    public function createUser(array $userData): array;
    public function updateUserLastLogin(int $userId): bool;

    // Specific pilates class operations
    public function findClassesByInstructor(int $instructorId): array;
    public function findAvailableClasses(\DateTime $date): array;
    public function createBooking(int $userId, int $classId): array;

    // Complex queries
    public function findUsersWithActiveBookings(): array;
    public function getClassesWithBookingCount(): array;
}
