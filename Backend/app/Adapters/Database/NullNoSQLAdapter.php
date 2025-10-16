<?php

namespace App\Adapters\Database;

use App\Application\Ports\NoSQLPort;
use Illuminate\Support\Facades\Log;

/**
 * Null adapter used when no MongoDB client/binding is available.
 * Provides no-op implementations so the app can run in dev without Mongo.
 */
class NullNoSQLAdapter implements NoSQLPort
{
    public function __construct()
    {
        // intentionally empty
    }

    public function __call($name, $arguments)
    {
        // Log the call for debugging and return null/empty as safe fallback
        Log::debug("NullNoSQLAdapter called: {$name}", ['args' => $arguments]);
        return null;
    }
}
