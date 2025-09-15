<?php

namespace App\Application\Ports;

/**
 * Port para acesso a dados não-relacionais (MongoDB)
 * Define operações para dados flexíveis como logs, analytics, cache
 */
interface NoSQLPort
{
    // Generic document operations
    public function insertDocument(string $collection, array $document): array;
    public function findDocumentById(string $collection, string $id): ?array;
    public function findDocuments(string $collection, array $filter = [], array $options = []): array;
    public function updateDocument(string $collection, string $id, array $data): ?array;
    public function deleteDocument(string $collection, string $id): bool;

    // Analytics operations
    public function logUserActivity(int $userId, string $action, array $metadata = []): array;
    public function getActivityLogs(int $userId, ?\DateTime $from = null, ?\DateTime $to = null): array;
    public function getPopularClasses(int $limit = 10): array;

    // Session management
    public function storeUserSession(int $userId, array $sessionData): array;
    public function getUserSession(int $userId): ?array;
    public function clearUserSession(int $userId): bool;

    // Cache operations
    public function cacheData(string $key, array $data, int $ttl = 3600): bool;
    public function getCachedData(string $key): ?array;
    public function invalidateCache(string $pattern): bool;

    // Flexible data storage
    public function storeUserPreferences(int $userId, array $preferences): array;
    public function getUserPreferences(int $userId): ?array;
    public function storeClassFeedback(int $classId, int $userId, array $feedback): array;
}
