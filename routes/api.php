<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

header('Access-Control-Allow-Origin:  *');
//header('Access-Control-Allow-Origin:  http://schedule.mspinfo.net');
header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, PATCH, DELETE');
header('Access-Control-Allow-Headers:  Content-Type, Authorization, Access-Token');

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'Auth\JWTAuthController@login');
});

Route::resource('users', 'Main\UserController');

Route::delete('upload', 'UploadController@deletePath');
Route::resource('upload', 'UploadController');

Route::post('/submit', function (Request $request) {
    $data = $request->except(['files']);
    $images = $request->file('files');
    $files = [];
    foreach($images as $key => $image){
        foreach($image as $i => $file){
            $files[$key][$i] = ['path' => $file->path(), 'name' => sprintf("%s-%d.%s", $key, $i + 1, $file->extension())];
        }
    }
    return response()->json(['data'=>$data, 'files'=>$files]);
});

//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:api');
