<?php

// use Illuminate\Http\Request;
use App\Adapters\Http\Aulas\AulasControllerAdapter;
use Illuminate\Support\Facades\Route;
// use App\Adapters\Http\Controllers\PilatesController;

Route::get('/', function () {
    return response()->json(['message' => 'Hello World']);
});

// Simple controller-backed hello endpoint
// Route::get('/hello', [PilatesController::class, 'hello']);

Route::get('/up', function() {
    return response()->json(['status' => 'up']);
});

Route::get('/aulas/types', [AulasControllerAdapter::class, 'listAulasTypes']);

require __DIR__.'/api/students.php';
require __DIR__.'/api/instructors.php';
require __DIR__.'/api/admin_receptionist.php';