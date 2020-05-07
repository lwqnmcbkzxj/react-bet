<?php

use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
/**
 * @SWG\Swagger(
 *   schemes={"http"},
 *   host="betting-hub.sixhands.co",
 *   basePath="/",
 *   @SWG\Info(
 *     title="Betting hub back-end API",
 *     version="0.2.0"
 *   )
 * )
 */
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
// Регистрация

Route::post('/register', 'RegisterController@register');
// Прогнозы


// Прогнозы
Route::get('/forecasts', 'Api\InfoController@forecasts');
Route::get('/forecasts/{forecast}', 'Api\InfoController@forecast');
Route::get('/comments', 'CommentController@get');
Route::get('/comments/{comment}', 'CommentController@getOne');
Route::get('/votes', 'VotesController@get');
Route::get('/news', 'Api\InfoController@news');
Route::get('/news/{news}', 'Api\InfoController@news');
Route::get('/sports', 'SportsController@get');
Route::get('/options', 'OptionsController@get');
Route::get('/roles', 'RolesController@get');
Route::get('/posts', 'Api\InfoController@posts');
Route::get('/posts/{post}', 'Api\InfoController@post');

//Доступ к профилям пользователей
Route::middleware('auth:api')->group(function()
{
    Route::post('/comments', 'CommentController@post');
    Route::delete('/comments/{comment}', 'CommentController@delete');
    Route::post('/votes', 'VotesController@post');
    Route::delete('/votes/{vote}', 'VotesController@delete');

  Route::prefix('/users')->group(function(){
        Route::get('', 'Api\InfoController@forecasters');
        Route::get('/profile', 'ProfileController@index')->name('profile');
        Route::post('/update/login', 'ProfileController@updateLogin')->name('update.login');
        Route::post('/update/email', 'ProfileController@updateEmail')->name('update.email');
        Route::post('/update/notification', 'ProfileController@updateNotification')->name('update.notification');
        Route::prefix('/{user}')->group(function()
        {
            Route::get('', 'Api\InfoController@forecaster');
            Route::get('/stats', 'Api\InfoController@userStatistic');
            Route::get('/forecasts', 'Api\InfoController@userForecasts');
            Route::post('/subscription', 'UserSubscriptionController@create');
            Route::get('/subscription', 'UserSubscriptionController@getSubscriptions');
            Route::get('/subscribers', 'UserSubscriptionController@getSubscribers');
            Route::delete('/subscription', 'UserSubscriptionController@delete');
        });
        });
});
/*


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



});
*/
