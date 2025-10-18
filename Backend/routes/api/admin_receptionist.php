<?php

use Illuminate\Support\Facades\Route;
use App\Adapters\Http\AdminReceptionist\AdminReceptionistControllerAdapter;

Route::prefix('admin_receptionist')->name('admin_receptionist.')->group(function () {
    Route::get('/', [AdminReceptionistControllerAdapter:: class, 'index'])->name('index');
    Route::post('save', [AdminReceptionistControllerAdapter::class, 'postAdminReceptionist'])->name('save');
});