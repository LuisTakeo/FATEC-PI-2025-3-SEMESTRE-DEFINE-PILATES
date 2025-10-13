<?php

namespace App\Providers;

use App\Adapters\Database\Instructor\InstructorMySQLAdapter;
use App\Adapters\Database\StudentMySQLAdapter;
use App\Application\Ports\StudentRepositoryPort;
use App\Application\Ports\StudentServiceContract;
use App\Application\Services\Student\StudentService;
use Illuminate\Support\ServiceProvider;
use App\Application\Ports\ApplicationPort;
use App\Application\Ports\SQLPort;
use App\Application\Ports\NoSQLPort;
use App\Application\Services\PilatesApplicationService;
use App\Adapters\Database\MySQLAdapter;
use App\Adapters\Database\MongoDBAdapter;
use App\Adapters\Database\NullNoSQLAdapter;
use App\Application\Ports\Instructor\InstructorRepositoryPort;
use App\Application\Ports\Instructor\InstructorServiceContract;
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
        $this->app->bind(SQLPort::class, MySQLAdapter::class);
        $this->app->bind(StudentRepositoryPort::class, StudentMySQLAdapter::class);
        
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
                    $app->make(NoSQLPort::class),
                );
            });


        //Instructor ⬇    
        $this->app->bind(
        InstructorServiceContract::class,
        InstructorService::class
        );
        $this->app->bind(
            InstructorRepositoryPort::class,
            InstructorMySQLAdapter::class
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
