<?php

use Illuminate\Support\Facades\Route;
use App\Adapters\Http\StudentControllerAdapter;

// Agrupa tudo de Student
Route::prefix('students')->name('students.')->group(function () {

    Route::get('/',        [StudentControllerAdapter::class, 'index'])->name('index');
    Route::post('/',       [StudentControllerAdapter::class, 'store'])->name('store');
    Route::get('{id}',     [StudentControllerAdapter::class, 'show'])->name('show');
    Route::put('{id}',     [StudentControllerAdapter::class, 'update'])->name('update');
    Route::delete('{id}',  [StudentControllerAdapter::class, 'destroy'])->name('destroy');

    // Endpoints específicos (exemplo)
    Route::post('{id}/activate', [StudentControllerAdapter::class, 'activate'])->name('activate');
});