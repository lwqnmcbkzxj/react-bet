<?php

use App\User;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
// Регистрация
Route::post('/register', 'RegisterController@register');

// Прогнозы
Route::post('/forecastList', 'ForecastControllerOld@getAll');
Route::get('/forecast/{id}', 'ForecastControllerOld@getOne');
Route::post('/news', 'NewsControllerOld@get');
Route::get('/news/{id}', 'NewsControllerOld@detail');
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
    Route::get('', 'Admin\UserController@index');
    Route::get('/statistic', 'Api\InfoController@userStatistic');
    Route::get('/forecasts', 'Api\InfoController@userForecasts');
    Route::prefix('/{user}')->group(function() // Можно поправить, вместо ID использовать логин
    {
        Route::get('', 'Admin\UserController@show');
        Route::post('/subscription', 'UserSubscriptionController@create');
        Route::get('/subscription', 'UserSubscriptionController@getSubscriptions');
        Route::get('/subscribers', 'UserSubscriptionController@getSubscribers');
        Route::delete('/subscription', 'UserSubscriptionController@delete');
    });

    Route::get('/profile', 'ProfileController@index')->name('profile');
    Route::post('/update/login', 'ProfileController@updateLogin')->name('update.login');
    Route::post('/update/email', 'ProfileController@updateEmail')->name('update.email');
    Route::post('/update/notification', 'ProfileController@updateNotification')->name('update.notification');
});
/*

Route::get('/sports', 'SportsController@get');
Route::get('/options', 'OptionsController@get');
Route::get('/roles', 'RolesController@get');

Route::get('/parser/add/users', 'Api\ForecastController@addUsers');
Route::get('/parser/add/forecasts', 'Api\ForecastController@addForecast');
Route::get('/parser/get/forecasts/status', 'Api\ForecastController@getForecastStatus');
Route::get('/get/news', 'Api\NewsController@getNews');

Route::post('/feedback/send', 'Api\FeedbackController@sendMail');

Route::post('/user/subscriptions/update', 'Api\UpdateController@updateUserSubscriptions');

// Api for mobile app
Route::group([
    'middleware' => 'api.auth',
], function (){
    Route::get('/forecasts/get', 'Api\InfoController@forecasts');
    Route::get('/forecasters/top', 'Api\InfoController@topForecasters');
    Route::get('/forecasters/rating', 'Api\InfoController@ratingForecasters');

    Route::get('/posts/', 'Api\InfoController@posts');
    Route::get('/posts/{id}', 'Api\InfoController@post');
    Route::get('/news/', 'Api\InfoController@news');
});
*/
