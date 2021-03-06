<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return view('secondary');
});

Route::get('/primary', function () {
    return view('app')->with(['project_name'=>'primary']);
});

Route::get('/secondary', function () {
    return view('app')->with(['project_name'=>'secondary']);
});