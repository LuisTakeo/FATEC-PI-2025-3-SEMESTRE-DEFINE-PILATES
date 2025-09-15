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


}
