<?php

namespace App\Adapters\Database;

use App\Application\Ports\StudentNoSQLPort;

class StudentMongoDBAdapter implements StudentNoSQLPort
{
    public function __construct()
    {
        // Inject dependencies here
    }
}
