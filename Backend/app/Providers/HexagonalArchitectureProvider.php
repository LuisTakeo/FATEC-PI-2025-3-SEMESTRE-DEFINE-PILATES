<?php

namespace App\Providers;

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

        // Bind NoSQL Port to MongoDB Adapter when mongodb binding is available,
        // otherwise use a Null adapter so the app can run without the package.
        if ($this->app->bound('mongodb')) {
            $this->app->bind(NoSQLPort::class, MongoDBAdapter::class);
        } else {
            $this->app->bind(NoSQLPort::class, NullNoSQLAdapter::class);
        }

        // Bind Application Port to Application Service
        $this->app->bind(ApplicationPort::class, function ($app) {
            return new PilatesApplicationService(
                $app->make(SQLPort::class),
                $app->make(NoSQLPort::class)
            );
        });

        $this->app->bind(StudentServiceContract::class,
            function ($app) {
                return new StudentService(
                    $app->make(SQLPort::class),
                    $app->make(NoSQLPort::class)
                );
            });
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
