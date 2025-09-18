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
        // Try to resolve the mongodb binding if available. If not, keep null.
        try {
            $this->connection = app()->has('mongodb') ? app('mongodb') : null;
        } catch (\Throwable $e) {
            // app('mongodb') may throw if the package isn't installed; swallow and keep null.
            $this->connection = null;
        }
    }


}
