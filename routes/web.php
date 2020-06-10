<?php

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;

Route::get('/policy', function () {
    $path = storage_path('policy.json');
    $file = File::get($path);
    $type = File::mimeType($path);
    return $file;
});
Route::get('/terms', function () {
    $path = storage_path('terms.json');
    $file = File::get($path);
    $type = File::mimeType($path);
    return $file;
});
Route::get('/feedback', function () {
    $path = storage_path('feedback.json');
    $file = File::get($path);
    $type = File::mimeType($path);
    return $file;
});
Route::get('storage/{filename}', function ($filename) {
    $path = storage_path('app\public\\' . $filename);

    if (!File::exists($path)) {
        abort(404);
    }

    $file = File::get($path);
    $type = File::mimeType($path);

    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);

    return $response;
});
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//
//Route::get('/', function () {
//    return view('welcome');
//});
//
//Route::get('/home', 'HomeController@index')->name('home');
