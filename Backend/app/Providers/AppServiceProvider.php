<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;
use L5Swagger\L5SwaggerServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
        $this->app->register(L5SwaggerServiceProvider::class);
       
    }
    
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Force HTTPS quando acessado via proxy (Ngrok)
        if (request()->header('X-Forwarded-Proto') === 'https' || 
            request()->header('X-Forwarded-Host')) {
            \URL::forceScheme('https');
        }

        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url')."/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });
    }
}
