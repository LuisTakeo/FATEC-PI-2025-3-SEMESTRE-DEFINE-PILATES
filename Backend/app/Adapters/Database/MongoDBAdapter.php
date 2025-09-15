<?php

namespace App\Adapters\Database;

use App\Application\Ports\NoSQLPort;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\BSON\ObjectId;
use Carbon\Carbon;

/**
 * Adapter para MongoDB usando Laravel MongoDB
 * Implementa NoSQLPort para operações em banco não-relacional
 */
class MongoDBAdapter implements NoSQLPort
{
    private $connection;

    public function __construct()
    {
        $this->connection = app('mongodb');
    }

    public function insertDocument(string $collection, array $document): array
    {
        $document['created_at'] = new \MongoDB\BSON\UTCDateTime();
        $document['updated_at'] = new \MongoDB\BSON\UTCDateTime();

        $result = $this->connection
            ->selectCollection(config('database.connections.mongodb.database'), $collection)
            ->insertOne($document);

        $document['_id'] = (string) $result->getInsertedId();
        return $document;
    }

    public function findDocumentById(string $collection, string $id): ?array
    {
        try {
            $result = $this->connection
                ->selectCollection(config('database.connections.mongodb.database'), $collection)
                ->findOne(['_id' => new ObjectId($id)]);

            return $result ? $result->toArray() : null;
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findDocuments(string $collection, array $filter = [], array $options = []): array
    {
        $cursor = $this->connection
            ->selectCollection(config('database.connections.mongodb.database'), $collection)
            ->find($filter, $options);

        return $cursor->toArray();
    }

    public function updateDocument(string $collection, string $id, array $data): ?array
    {
        try {
            $data['updated_at'] = new \MongoDB\BSON\UTCDateTime();

            $result = $this->connection
                ->selectCollection(config('database.connections.mongodb.database'), $collection)
                ->updateOne(
                    ['_id' => new ObjectId($id)],
                    ['$set' => $data]
                );

            return $result->getModifiedCount() > 0 ? $this->findDocumentById($collection, $id) : null;
        } catch (\Exception $e) {
            return null;
        }
    }

    public function deleteDocument(string $collection, string $id): bool
    {
        try {
            $result = $this->connection
                ->selectCollection(config('database.connections.mongodb.database'), $collection)
                ->deleteOne(['_id' => new ObjectId($id)]);

            return $result->getDeletedCount() > 0;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function logUserActivity(int $userId, string $action, array $metadata = []): array
    {
        $activityLog = [
            'user_id' => $userId,
            'action' => $action,
            'metadata' => $metadata,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'timestamp' => new \MongoDB\BSON\UTCDateTime()
        ];

        return $this->insertDocument('activity_logs', $activityLog);
    }

    public function getActivityLogs(int $userId, ?\DateTime $from = null, ?\DateTime $to = null): array
    {
        $filter = ['user_id' => $userId];

        if ($from || $to) {
            $dateFilter = [];
            if ($from) {
                $dateFilter['$gte'] = new \MongoDB\BSON\UTCDateTime($from);
            }
            if ($to) {
                $dateFilter['$lte'] = new \MongoDB\BSON\UTCDateTime($to);
            }
            $filter['timestamp'] = $dateFilter;
        }

        return $this->findDocuments('activity_logs', $filter, ['sort' => ['timestamp' => -1]]);
    }

    public function getPopularClasses(int $limit = 10): array
    {
        $pipeline = [
            ['$group' => [
                '_id' => '$class_id',
                'booking_count' => ['$sum' => 1],
                'last_booking' => ['$max' => '$timestamp']
            ]],
            ['$sort' => ['booking_count' => -1]],
            ['$limit' => $limit]
        ];

        $cursor = $this->connection
            ->selectCollection(config('database.connections.mongodb.database'), 'class_bookings')
            ->aggregate($pipeline);

        return $cursor->toArray();
    }

    public function storeUserSession(int $userId, array $sessionData): array
    {
        $session = [
            'user_id' => $userId,
            'session_data' => $sessionData,
            'expires_at' => new \MongoDB\BSON\UTCDateTime(now()->addHours(24)),
        ];

        // Remove previous sessions for this user
        $this->connection
            ->selectCollection(config('database.connections.mongodb.database'), 'user_sessions')
            ->deleteMany(['user_id' => $userId]);

        return $this->insertDocument('user_sessions', $session);
    }

    public function getUserSession(int $userId): ?array
    {
        $session = $this->connection
            ->selectCollection(config('database.connections.mongodb.database'), 'user_sessions')
            ->findOne([
                'user_id' => $userId,
                'expires_at' => ['$gt' => new \MongoDB\BSON\UTCDateTime()]
            ]);

        return $session ? $session->toArray() : null;
    }

    public function clearUserSession(int $userId): bool
    {
        $result = $this->connection
            ->selectCollection(config('database.connections.mongodb.database'), 'user_sessions')
            ->deleteMany(['user_id' => $userId]);

        return $result->getDeletedCount() > 0;
    }

    public function cacheData(string $key, array $data, int $ttl = 3600): bool
    {
        $cacheDoc = [
            'key' => $key,
            'data' => $data,
            'expires_at' => new \MongoDB\BSON\UTCDateTime(now()->addSeconds($ttl))
        ];

        // Remove existing cache for this key
        $this->connection
            ->selectCollection(config('database.connections.mongodb.database'), 'cache')
            ->deleteMany(['key' => $key]);

        $result = $this->insertDocument('cache', $cacheDoc);
        return !empty($result);
    }

    public function getCachedData(string $key): ?array
    {
        $cached = $this->connection
            ->selectCollection(config('database.connections.mongodb.database'), 'cache')
            ->findOne([
                'key' => $key,
                'expires_at' => ['$gt' => new \MongoDB\BSON\UTCDateTime()]
            ]);

        return $cached ? $cached['data'] : null;
    }

    public function invalidateCache(string $pattern): bool
    {
        $result = $this->connection
            ->selectCollection(config('database.connections.mongodb.database'), 'cache')
            ->deleteMany(['key' => ['$regex' => $pattern]]);

        return $result->getDeletedCount() > 0;
    }

    public function storeUserPreferences(int $userId, array $preferences): array
    {
        $prefDoc = [
            'user_id' => $userId,
            'preferences' => $preferences
        ];

        // Update or insert preferences
        $existing = $this->connection
            ->selectCollection(config('database.connections.mongodb.database'), 'user_preferences')
            ->findOne(['user_id' => $userId]);

        if ($existing) {
            return $this->updateDocument('user_preferences', (string) $existing['_id'], $prefDoc);
        } else {
            return $this->insertDocument('user_preferences', $prefDoc);
        }
    }

    public function getUserPreferences(int $userId): ?array
    {
        $prefs = $this->connection
            ->selectCollection(config('database.connections.mongodb.database'), 'user_preferences')
            ->findOne(['user_id' => $userId]);

        return $prefs ? $prefs->toArray() : null;
    }

    public function storeClassFeedback(int $classId, int $userId, array $feedback): array
    {
        $feedbackDoc = [
            'class_id' => $classId,
            'user_id' => $userId,
            'feedback' => $feedback,
            'rating' => $feedback['rating'] ?? null,
            'comment' => $feedback['comment'] ?? null
        ];

        return $this->insertDocument('class_feedback', $feedbackDoc);
    }
}
