<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Adapters\Http\Controllers\PilatesController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Public API Routes - Hexagonal Architecture
Route::prefix('v1')->group(function () {

    // User Management Routes
    Route::prefix('users')->group(function () {
        Route::get('/', [PilatesController::class, 'getAllUsers']);
        Route::post('/', [PilatesController::class, 'createUser']);
        Route::get('/{id}', [PilatesController::class, 'getUserById']);
        Route::put('/{id}', [PilatesController::class, 'updateUser']);
        Route::delete('/{id}', [PilatesController::class, 'deleteUser']);
        Route::get('/{userId}/classes', [PilatesController::class, 'getClassesByUser']);
    });

    // Pilates Classes Routes
    Route::prefix('classes')->group(function () {
        Route::get('/', [PilatesController::class, 'getAllPilatesClasses']);
        Route::post('/', [PilatesController::class, 'createPilatesClass']);
        Route::get('/available', [PilatesController::class, 'getAvailableClasses']);
        Route::get('/{id}', [PilatesController::class, 'getPilatesClassById']);
        Route::put('/{id}', [PilatesController::class, 'updatePilatesClass']);
        Route::delete('/{id}', [PilatesController::class, 'deletePilatesClass']);
    });

    // Booking Routes
    Route::prefix('bookings')->group(function () {
        Route::post('/', [PilatesController::class, 'bookUserToClass']);
    });

    // Health Check Route
    Route::get('/health', function () {
        return response()->json([
            'success' => true,
            'message' => 'Pilates API is running',
            'architecture' => 'Hexagonal Architecture',
            'timestamp' => now()
        ]);
    });
});

// Hexagonal Architecture - Pilates API Routes
Route::prefix('v1')->group(function () {

    // Users endpoints
    Route::apiResource('users', PilatesController::class, [
        'only' => ['index', 'show', 'store', 'update', 'destroy'],
        'names' => [
            'index' => 'users.index',
            'show' => 'users.show',
            'store' => 'users.store',
            'update' => 'users.update',
            'destroy' => 'users.destroy'
        ]
    ])->parameters(['users' => 'id']);

    // Custom user endpoints
    Route::get('users', [PilatesController::class, 'getAllUsers'])->name('users.all');
    Route::get('users/{id}', [PilatesController::class, 'getUserById'])->name('users.by-id');
    Route::post('users', [PilatesController::class, 'createUser'])->name('users.create');
    Route::put('users/{id}', [PilatesController::class, 'updateUser'])->name('users.update');
    Route::delete('users/{id}', [PilatesController::class, 'deleteUser'])->name('users.delete');

    // Pilates Classes endpoints
    Route::get('classes', [PilatesController::class, 'getAllPilatesClasses'])->name('classes.all');
    Route::get('classes/available', [PilatesController::class, 'getAvailableClasses'])->name('classes.available');
    Route::get('classes/{id}', [PilatesController::class, 'getPilatesClassById'])->name('classes.by-id');
    Route::post('classes', [PilatesController::class, 'createPilatesClass'])->name('classes.create');
    Route::put('classes/{id}', [PilatesController::class, 'updatePilatesClass'])->name('classes.update');
    Route::delete('classes/{id}', [PilatesController::class, 'deletePilatesClass'])->name('classes.delete');

    // Bookings endpoints
    Route::post('bookings', [PilatesController::class, 'bookUserToClass'])->name('bookings.create');
    Route::get('users/{userId}/classes', [PilatesController::class, 'getClassesByUser'])->name('users.classes');

});
