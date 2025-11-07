<?php

use Illuminate\Support\Facades\Route;
use App\Adapters\Http\Instructor\InstructorControllerAdapter;

Route::prefix('instructors')->name('instructors.')->group(function () {
    Route::get('/', [InstructorControllerAdapter:: class, 'index'])->name('index');
    Route::post('save', [InstructorControllerAdapter::class, 'postInstructor'])->name('save');
    Route::post('login', [InstructorControllerAdapter::class, 'login'])->name('login');
});