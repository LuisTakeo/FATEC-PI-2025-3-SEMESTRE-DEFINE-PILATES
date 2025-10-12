<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;
use L5Swagger\L5SwaggerServiceProvider;

use App\Application\Ports\Instructor\InstructorServiceContract;
use App\Application\Services\Instructor\InstructorService;

use App\Application\Ports\Instructor\InstructorRepositoryPort;
use App\Adapters\Database\Instructor\InstructorMySQLAdapter;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
        $this->app->register(L5SwaggerServiceProvider::class);
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
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url')."/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });
    }
}
