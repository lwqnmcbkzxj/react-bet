<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
// Регистрация
Route::post('/register', 'RegisterController@register');

// Прогнозы
Route::post('/forecastList', 'ForecastController@getAll');
Route::get('/forecast/{id}', 'ForecastController@getOne');
// Работа с юзером
