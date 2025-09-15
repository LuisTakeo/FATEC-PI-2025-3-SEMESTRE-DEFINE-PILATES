<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Application\Ports\ApplicationPort;
use App\Application\Ports\SQLPort;
use App\Application\Ports\NoSQLPort;
use App\Application\Services\PilatesApplicationService;
use App\Adapters\Database\MySQLAdapter;
use App\Adapters\Database\MongoDBAdapter;

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

        // Bind NoSQL Port to MongoDB Adapter
        $this->app->bind(NoSQLPort::class, MongoDBAdapter::class);

        // Bind Application Port to Application Service
        $this->app->bind(ApplicationPort::class, function ($app) {
            return new PilatesApplicationService(
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
