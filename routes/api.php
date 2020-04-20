<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
// Регистрация
Route::post('/register', 'RegisterController@register');

// Прогнозы
Route::post('/forecast/getAll', 'ForecastController@getAll');
Route::post('/forecast/getBySport', 'ForecastController@getBySport');
Route::post('/forecast/getByUser', 'ForecastController@getByUser');
Route::get('/forecast/{id}', 'ForecastController@getOne');

// Работа с юзером
Route::get('/userSubscribes/{id}', 'UserWorksController@getSubscribes');