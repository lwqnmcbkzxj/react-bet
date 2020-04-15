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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

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
    Route::get('/user/statistic', 'Api\InfoController@userStatistic');
    Route::get('/user/forecasts', 'Api\InfoController@userForecasts');
    Route::get('/posts/', 'Api\InfoController@posts');
    Route::get('/posts/{id}', 'Api\InfoController@post');
    Route::get('/news/', 'Api\InfoController@news');
});