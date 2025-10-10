<?php

// use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// use App\Adapters\Http\Controllers\PilatesController;

Route::get('/', function () {
    return response()->json(['message' => 'Hello World']);
});

// Simple controller-backed hello endpoint
// Route::get('/hello', [PilatesController::class, 'hello']);

require __DIR__.'/api/students.php';