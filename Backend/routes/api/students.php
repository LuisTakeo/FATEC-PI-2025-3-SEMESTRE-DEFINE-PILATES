<?php

use App\Adapters\Http\Aulas\AulasControllerAdapter;
use Illuminate\Support\Facades\Route;
use App\Adapters\Http\Student\StudentControllerAdapter;

// Agrupa tudo de Student
Route::prefix('students')->name('students.')->group(function () {

    Route::get('/', [StudentControllerAdapter::class, 'index'])->name('index');
    Route::get('/list', [StudentControllerAdapter::class, 'listStudents'])->name('list');
    Route::post('save', [StudentControllerAdapter::class, 'postRequest'])->name('save');
    Route::post('/login', [StudentControllerAdapter::class, 'login'])->name('login');

    Route::get('/{id_student}/aulas', [AulasControllerAdapter::class, 'listAulasAluno'])->name('aulas');
    Route::get('/{id_student}/aulas/available', [AulasControllerAdapter::class, 'listAvailableAulasForStudent'])->name('aulas.available');
    Route::post('/aulas/{id_aula}/enroll', [AulasControllerAdapter::class, 'enrollStudentInAula'])->name('aulas.enroll');
    // Route::post('save-validation', [StudentControllerAdapter::class, 'postWithValidation'])->name('store');
    // Route::get('{id}',     [StudentControllerAdapter::class, 'show'])->name('show');
    // Route::put('{id}',     [StudentControllerAdapter::class, 'update'])->name('update');
    // Route::delete('{id}',  [StudentControllerAdapter::class, 'destroy'])->name('destroy');

    // Endpoints específicos (exemplo)
    // Route::post('{id}/activate', [StudentControllerAdapter::class, 'activate'])->name('activate');
});