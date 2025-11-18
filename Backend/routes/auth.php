<?php

use App\Adapters\Http\Auth\AuthControllerAdapter;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

// ============================================
// JWT AUTHENTICATION ROUTES (Protected)
// ============================================
Route::prefix('auth')->name('auth.')->middleware('auth:api')->group(function () {
    Route::get('/me', [AuthControllerAdapter::class, 'me'])->name('me');
    Route::post('/logout', [AuthControllerAdapter::class, 'logout'])->name('logout');
    Route::post('/refresh', [AuthControllerAdapter::class, 'refresh'])->name('refresh');
});

// ============================================
// LEGACY ROUTES (Laravel Breeze - não usado)
// ============================================
Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest')
    ->name('register');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest')
    ->name('login');

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
    ->middleware('guest')
    ->name('password.email');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
    ->middleware('guest')
    ->name('password.store');

Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
    ->middleware(['auth', 'signed', 'throttle:6,1'])
    ->name('verification.verify');

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
    ->middleware(['auth', 'throttle:6,1'])
    ->name('verification.send');

Route::post('/old-logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('old.logout');
