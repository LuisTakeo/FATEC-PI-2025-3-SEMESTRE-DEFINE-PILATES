<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response('Hello World');
});
