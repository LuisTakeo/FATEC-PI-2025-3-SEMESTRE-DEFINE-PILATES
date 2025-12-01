<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Trust proxies (Ngrok, Load Balancers)
        $middleware->trustProxies(at: '*');
        
        // Comentado o Sanctum para teste de API básica
        // $middleware->api(prepend: [
        //     \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        // ]);

        $middleware->api(prepend: [
            \App\Http\Middleware\DebugRequestMiddleware::class,
        ]);

        $middleware->alias([
            'verified' => \App\Http\Middleware\EnsureEmailIsVerified::class,
            'user.type' => \App\Http\Middleware\CheckUserType::class,
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Garante que erros de autenticação JWT retornem JSON
        $exceptions->render(function (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e, $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Token expirado',
                    'error' => 'Token expired'
                ], 401);
            }
        });

        $exceptions->render(function (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e, $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Token inválido',
                    'error' => 'Token invalid'
                ], 401);
            }
        });

        $exceptions->render(function (\Tymon\JWTAuth\Exceptions\JWTException $e, $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Erro de autenticação',
                    'error' => 'Token not provided or invalid'
                ], 401);
            }
        });

        // Captura erros de autenticação genéricos
        $exceptions->render(function (\Illuminate\Auth\AuthenticationException $e, $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Não autenticado',
                    'error' => 'Unauthenticated'
                ], 401);
            }
        });

        // Mantém o handler de validação existente
        $exceptions->render(function (App\Adapters\Http\Exceptions\ValidationException $e) {
            return $e->render();
        });
    })->create();
