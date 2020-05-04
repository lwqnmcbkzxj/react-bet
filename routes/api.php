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

Route::middleware('auth:api')->post('/forecastLike', 'ForecastController@like');
Route::middleware('auth:api')->post('/forecastComment', 'ForecastController@comment');
Route::middleware('auth:api')->post('/forecastFav', 'ForecastController@makeFav');

// Прогнозы
/*
Route::middleware('auth:api')->prefix('/forecasts')->group(function() {
    Route::post('/', 'ForecastController@get');
    Route::prefix('/{id}')->where(['id'=>'[0-9]+'])->group(function()
    {
        Route::post('/', 'ForecastController@get');
        Route::post('/like', 'ForecastLikeController@post');
        Route::delete('/like', 'ForecastLikeController@delete');
        Route::post('/comment', 'ForecastCommentController@post');
        Route::delete('/comment', 'ForecastCommentController@delete');
        Route::post('/favorite', 'ForecastFavoriteController@post');
        Route::delete('/favorite', 'ForecastFavoriteController@delete');
        Route::patch('/comment', 'ForecastCommentController@patch');
    });
});*/
//Доступ к профилям пользователей
Route::middleware('auth:api')->prefix('/users')->group(function()
{
    Route::prefix('/{id}')->group(function() // Можно поправить, вместо ID использовать логин
    {
        Route::get('/', 'UserController@get');
        Route::post('/subscription', 'UserSubscriptionController@create');
        Route::get('/subscription', 'UserSubscriptionController@get');
        Route::delete('/subscription', 'UserSubscriptionController@delete');
    });
    Route::get('/', 'UserController@get');
});

Route::post('/news', 'NewsController@get');
Route::get('/news/{id}', 'NewsController@detail');
Route::get('/sports', 'SportsController@get');
Route::get('/options', 'OptionsController@get');
Route::get('/roles', 'RolesController@get');

