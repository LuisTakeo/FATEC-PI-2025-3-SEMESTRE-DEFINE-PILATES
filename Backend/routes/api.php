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
    return response()->json(['status' => 'ok'], 200);
});

Route::get('/aulas/types', [AulasControllerAdapter::class, 'listAulasTypes']);
Route::get('/aulas/studios', [AulasControllerAdapter::class, 'listStudios']);
Route::post('/aulas/cadastro', [AulasControllerAdapter::class, 'registerAula']);
Route::get('/aulas', [AulasControllerAdapter::class, 'index']);
    // ->middleware(['auth:api', 'user.type:Administrator']); // para usar de referencia

require __DIR__.'/auth.php';
require __DIR__.'/api/students.php';
require __DIR__.'/api/instructors.php';
require __DIR__.'/api/admin_receptionist.php';