<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DebugRequestMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        Log::debug('DEBUG REQUEST MIDDLEWARE', [
            'method' => $request->method(),
            'url' => $request->fullUrl(),
            'headers' => $request->headers->all(),
            'content' => $request->getContent(),
            'all' => $request->all(),
            'input' => $request->input(),
            'json' => $request->json() ? $request->json()->all() : 'NO JSON',
            'content_type' => $request->header('Content-Type')
        ]);

        return $next($request);
    }
}