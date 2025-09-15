<?php

namespace App\Application\Services;

use App\Application\Ports\ApplicationPort;
use App\Application\Ports\SQLPort;
use App\Application\Ports\NoSQLPort;

/**
 * Application Layer - Implementa casos de uso do negócio
 * Esta é a camada central da arquitetura hexagonal
 */
class PilatesApplicationService implements ApplicationPort
{
    private SQLPort $sqlAdapter;
    private NoSQLPort $noSQLAdapter;

    public function __construct(SQLPort $sqlAdapter, NoSQLPort $noSQLAdapter)
    {
        $this->sqlAdapter = $sqlAdapter;
        $this->noSQLAdapter = $noSQLAdapter;
    }

    // ========== USER USE CASES ==========

    public function createUser(array $userData): array
    {
        // Business validation
        if (empty($userData['email']) || empty($userData['password'])) {
            throw new \InvalidArgumentException('Email and password are required');
        }

        // Check if user already exists
        $existingUser = $this->sqlAdapter->findUserByEmail($userData['email']);
        if ($existingUser) {
            throw new \InvalidArgumentException('User with this email already exists');
        }

        // Create user in SQL database
        $user = $this->sqlAdapter->createUser($userData);

        // Log activity in NoSQL
        $this->noSQLAdapter->logUserActivity(
            $user['id'],
            'user_created',
            ['email' => $user['email']]
        );

        // Store default preferences in NoSQL
        $this->noSQLAdapter->storeUserPreferences($user['id'], [
            'notification_enabled' => true,
            'language' => 'pt-BR',
            'theme' => 'light'
        ]);

        return $user;
    }

    public function getUserById(int $id): ?array
    {
        $user = $this->sqlAdapter->findById('users', $id);

        if ($user) {
            // Get user preferences from NoSQL
            $preferences = $this->noSQLAdapter->getUserPreferences($id);
            $user['preferences'] = $preferences['preferences'] ?? [];

            // Log access
            $this->noSQLAdapter->logUserActivity($id, 'user_accessed');
        }

        return $user;
    }

    public function getAllUsers(): array
    {
        return $this->sqlAdapter->findAll('users');
    }

    public function updateUser(int $id, array $userData): ?array
    {
        $user = $this->sqlAdapter->update('users', $id, $userData);

        if ($user) {
            $this->noSQLAdapter->logUserActivity($id, 'user_updated', $userData);
        }

        return $user;
    }

    public function deleteUser(int $id): bool
    {
        $deleted = $this->sqlAdapter->delete('users', $id);

        if ($deleted) {
            // Clean up NoSQL data
            $this->noSQLAdapter->clearUserSession($id);
            $this->noSQLAdapter->logUserActivity($id, 'user_deleted');
        }

        return $deleted;
    }

    // ========== PILATES CLASS USE CASES ==========

    public function createPilatesClass(array $classData): array
    {
        // Business validation
        if (empty($classData['name']) || empty($classData['instructor_id'])) {
            throw new \InvalidArgumentException('Name and instructor are required');
        }

        if (isset($classData['max_participants']) && $classData['max_participants'] <= 0) {
            throw new \InvalidArgumentException('Max participants must be greater than 0');
        }

        // Create class in SQL
        $class = $this->sqlAdapter->create('pilates_classes', $classData);

        // Log in NoSQL
        $this->noSQLAdapter->logUserActivity(
            $classData['instructor_id'],
            'class_created',
            ['class_id' => $class['id'], 'class_name' => $class['name']]
        );

        // Cache popular classes data needs refresh
        $this->noSQLAdapter->invalidateCache('popular_classes*');

        return $class;
    }

    public function getPilatesClassById(int $id): ?array
    {
        // Try cache first
        $cacheKey = "class_{$id}";
        $cached = $this->noSQLAdapter->getCachedData($cacheKey);

        if ($cached) {
            return $cached;
        }

        // Get from SQL
        $class = $this->sqlAdapter->findById('pilates_classes', $id);

        if ($class) {
            // Cache for 1 hour
            $this->noSQLAdapter->cacheData($cacheKey, $class, 3600);
        }

        return $class;
    }

    public function getAllPilatesClasses(): array
    {
        return $this->sqlAdapter->getClassesWithBookingCount();
    }

    public function updatePilatesClass(int $id, array $classData): ?array
    {
        $class = $this->sqlAdapter->update('pilates_classes', $id, $classData);

        if ($class) {
            // Invalidate cache
            $this->noSQLAdapter->invalidateCache("class_{$id}");

            // Log update
            $this->noSQLAdapter->logUserActivity(
                $class['instructor_id'] ?? 0,
                'class_updated',
                ['class_id' => $id]
            );
        }

        return $class;
    }

    public function deletePilatesClass(int $id): bool
    {
        $class = $this->sqlAdapter->findById('pilates_classes', $id);
        $deleted = $this->sqlAdapter->delete('pilates_classes', $id);

        if ($deleted && $class) {
            // Clean up cache
            $this->noSQLAdapter->invalidateCache("class_{$id}");

            // Log deletion
            $this->noSQLAdapter->logUserActivity(
                $class['instructor_id'] ?? 0,
                'class_deleted',
                ['class_id' => $id]
            );
        }

        return $deleted;
    }

    // ========== BUSINESS LOGIC USE CASES ==========

    public function bookUserToClass(int $userId, int $classId): bool
    {
        // Get class details
        $class = $this->sqlAdapter->findById('pilates_classes', $classId);
        if (!$class) {
            throw new \InvalidArgumentException('Class not found');
        }

        // Check if class is available
        if ($class['status'] !== 'scheduled') {
            throw new \InvalidArgumentException('Class is not available for booking');
        }

        // Check max participants
        $currentBookings = $this->sqlAdapter->findAll('bookings', [
            'class_id' => $classId,
            'status' => 'confirmed'
        ]);

        if (count($currentBookings) >= $class['max_participants']) {
            throw new \InvalidArgumentException('Class is full');
        }

        // Create booking
        $booking = $this->sqlAdapter->createBooking($userId, $classId);

        // Log activities in NoSQL
        $this->noSQLAdapter->logUserActivity($userId, 'class_booked', [
            'class_id' => $classId,
            'booking_id' => $booking['id']
        ]);

        // Store booking analytics in NoSQL
        $this->noSQLAdapter->insertDocument('class_bookings', [
            'user_id' => $userId,
            'class_id' => $classId,
            'booking_id' => $booking['id'],
            'timestamp' => new \MongoDB\BSON\UTCDateTime()
        ]);

        return true;
    }

    public function getClassesByUser(int $userId): array
    {
        return $this->sqlAdapter->findAll('bookings', ['user_id' => $userId]);
    }

    public function getAvailableClasses(): array
    {
        // Try cache first
        $cacheKey = 'available_classes';
        $cached = $this->noSQLAdapter->getCachedData($cacheKey);

        if ($cached) {
            return $cached;
        }

        // Get from SQL
        $classes = $this->sqlAdapter->findAvailableClasses(new \DateTime());

        // Cache for 15 minutes
        $this->noSQLAdapter->cacheData($cacheKey, $classes, 900);

        return $classes;
    }
}
