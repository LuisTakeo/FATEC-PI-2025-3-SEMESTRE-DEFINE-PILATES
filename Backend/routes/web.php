<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response('Hello World');
});

// Health check para Render
Route::get('/up', function () {
    return response()->json([
        'status' => 'up',
        'timestamp' => now()->toIso8601String()
    ]);
});
