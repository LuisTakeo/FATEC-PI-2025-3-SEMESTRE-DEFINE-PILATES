<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response('Hello World');
});

// Health check para Render - SIMPLIFICADO para garantir resposta rápida
Route::get('/up', function () {
    return response()->json(['status' => 'ok'], 200);
});
