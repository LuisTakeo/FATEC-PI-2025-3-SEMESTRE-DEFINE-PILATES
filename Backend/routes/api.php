<?php

// use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// use App\Adapters\Http\Controllers\PilatesController;

Route::get('/', function () {
    return response()->json(['message' => 'Hello World']);
});
