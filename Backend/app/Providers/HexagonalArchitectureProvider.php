<?php

namespace App\Providers;

use App\Adapters\Database\AdminReceptionist\AdminReceptionistMySQLAdapter;
use App\Adapters\Database\Aulas\AulasMySQLAdapter;
use App\Adapters\Database\Instructor\InstructorPostgreSQLAdapter;
use App\Adapters\Database\StudentMongoDBAdapter;
use App\Adapters\Database\Instructor\InstructorMySQLAdapter;
use App\Adapters\Database\StudentMySQLAdapter;
use App\Adapters\Database\StudentPostgreSQLAdapter;
use App\Application\Ports\AdminReceptionist\AdminReceptionistServiceContract;
use App\Application\Ports\Auth\AuthServiceContract;
use App\Application\Ports\Aulas\AulasRepositoryPort;
use App\Application\Ports\Aulas\AulasServiceContract;
use App\Application\Ports\StudentNoSQLPort;
use App\Application\Ports\StudentRepositoryPort;
use App\Application\Ports\StudentServiceContract;
use App\Application\Services\Auth\AuthService;
use App\Application\Services\Aulas\AulasService;
use App\Application\Services\Student\StudentService;
use Illuminate\Support\ServiceProvider;
use App\Application\Ports\ApplicationPort;
use App\Application\Ports\SQLPort;
use App\Application\Ports\NoSQLPort;
use App\Application\Services\PilatesApplicationService;
use App\Adapters\Database\MySQLAdapter;
use App\Adapters\Database\MongoDBAdapter;
use App\Adapters\Database\NullNoSQLAdapter;
use App\Application\Ports\AdminReceptionist\AdminReceptionistRepositoryPort;
use App\Application\Ports\Instructor\InstructorRepositoryPort;
use App\Application\Ports\Instructor\InstructorServiceContract;
use App\Application\Services\AdminReceptionist\AdminReceptionistService;
use App\Application\Services\Instructor\InstructorService;

/**
 * Hexagonal Architecture Service Provider
 * Configura toda a injeção de dependência da arquitetura hexagonal
 */
class HexagonalArchitectureProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        // Bind SQL Port to MySQL Adapter
        $db = $_ENV['DB_CONNECTION'] ?? 'mysql';
        if ($db == 'mysql') {
            $this->app->bind(SQLPort::class, MySQLAdapter::class);
            $this->app->bind(StudentRepositoryPort::class, StudentMySQLAdapter::class);
        }
        else if ($db == 'pgsql') {
            // Implement PostgreSQL Adapter binding here if needed
            // $this->app->bind(SQLPort::class, PostgresAdapter::class);
            $this->app->bind(StudentRepositoryPort::class, StudentPostgreSQLAdapter::class);
        }
        $this->app->bind(StudentNoSQLPort::class, StudentMongoDBAdapter::class);

        // Bind NoSQL Port to MongoDB Adapter when mongodb binding is available,
        // otherwise use a Null adapter so the app can run without the package.
        if ($this->app->bound('mongodb')) {
            $this->app->bind(NoSQLPort::class, MongoDBAdapter::class);
        } else {
            $this->app->bind(NoSQLPort::class, NullNoSQLAdapter::class);
        }

        // Bind Application Port to Application Service


        $this->app->bind(StudentServiceContract::class,
            function ($app) {
                return new StudentService(
                    $app->make(StudentRepositoryPort::class),
                    $app->make(StudentNoSQLPort::class),
                );
            });


        //Instructor ⬇    
        $this->app->bind(
        InstructorServiceContract::class,
        InstructorService::class
        );
        if ($db == 'mysql') {
            $this->app->bind(
                InstructorRepositoryPort::class,
                InstructorMySQLAdapter::class
            );
        }
        else if ($db == 'pgsql') {
            // Implement PostgreSQL Adapter binding here if needed
            $this->app->bind(InstructorRepositoryPort::class, 
                InstructorPostgreSQLAdapter::class
            );
        }
        //Admin and Receptionist ⬇
        $this->app->bind(
            AdminReceptionistServiceContract::class,
            AdminReceptionistService::class
        );
        $this->app->bind(
            AdminReceptionistRepositoryPort::class,
            AdminReceptionistMySQLAdapter::class
        );

        $this->app->bind(
            AulasServiceContract::class, 
            AulasService::class);
        $this->app->bind(
            AulasRepositoryPort::class,
            AulasMySQLAdapter::class
        );

        // Auth Service
        $this->app->bind(
            AuthServiceContract::class,
            AuthService::class
        );

    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Get the services provided by the provider.
     */
    public function provides(): array
    {
        return [
            ApplicationPort::class,
            SQLPort::class,
            NoSQLPort::class,
        ];
    }
}
