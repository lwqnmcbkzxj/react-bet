<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Регистрация

Route::post('/register', 'RegisterController@register');
// Прогнозы
Auth::routes();;

// Прогнозы


// Прогнозы
Route::get('/forecasts', 'Api\InfoController@forecasts');
Route::get('/forecasts/{forecast}', 'Api\InfoController@forecast');
Route::get('/comments', 'CommentController@get');
Route::get('/comments/{comment}', 'CommentController@getOne');
Route::get('/votes', 'VoteController@get');
Route::get('/news', 'Api\InfoController@news');
Route::get('/news/{news}', 'Api\InfoController@news');
Route::get('/sports', function () { return \App\Sport::all(); } );
Route::get('/options',  function () { return \App\Option::all(); });
Route::get('/roles', function () { return \App\Role::all(); });
Route::get('/events',  function () { return \App\Event::all(); });
Route::get('/posts', 'Api\InfoController@posts');
Route::get('/posts/{post}', 'Api\InfoController@post');
Route::get('/posts/{post}/comments', function (Request $Request, \App\Comment $comment){
    $Request['reference_to']='posts';
    $Request['referent_id']=$comment->id;
    return app()->call('App\Http\Controllers\CommentController@getAll',[$Request]);
});
Route::get('/news/{news}/comments', function (Request $Request, \App\News $news){
    $Request['reference_to']='news';
    $Request['referent_id']=$news->id;
    return app()->call('App\Http\Controllers\CommentController@getAll',[$Request]);
});
Route::get('/forecasts/{forecast}/comments', function (Request $Request, \App\Forecast $forecast){
    $Request['reference_to']='forecasts';
    $Request['referent_id']=$forecast->id;
    return app()->call('App\Http\Controllers\CommentController@getAll',[$Request]);
});
Route::get('/users', 'Api\InfoController@forecasters');
Route::get('/users/{user}/stats', 'Api\InfoController@userStatistic');
Route::get('/users/{user}/forecasts', 'Api\InfoController@userForecasts');
Route::get('/users/{user}/subscription', 'UserSubscriptionController@getSubscriptions');
Route::get('/users/{user}/subscribers', 'UserSubscriptionController@getSubscribers');

//Доступ к профилям пользователей
Route::middleware('auth:api')->group(function()
{

    Route::post('/comments', 'CommentController@post');
    Route::delete('/comments/{comment}', 'CommentController@delete');
    Route::post('/votes', 'VoteController@post');
    Route::delete('/votes/{vote}', 'VoteController@delete');
  Route::prefix('/users')->group(function(){

        Route::get('/profile', 'ProfileController@index')->name('profile');
        Route::post('/update/login', 'ProfileController@updateLogin')->name('update.login');
        Route::post('/update/email', 'ProfileController@updateEmail')->name('update.email');
        Route::post('/update/notification', 'ProfileController@updateNotification')->name('update.notification');
        Route::post('/{user}/subscription', 'UserSubscriptionController@create');
        Route::delete('/{user}/subscription', 'UserSubscriptionController@delete');
        Route::get('/{user}', 'Api\InfoController@forecaster');
    });

    Route::post('/news/{news}/like', function (Request $Request, \App\News $news){
        $Request['type']='like';
        $Request['reference_to']='news';
        $Request['referent_id']=$news->id;
        return app()->call('App\Http\Controllers\VoteController@post',[$Request]);
    });
    Route::post('/news/{news}/dislike', function (Request $Request, \App\News $news){
        $Request['type']='dislike';
        $Request['reference_to']='news';
        $Request['referent_id']=$news->id;
        return app()->call('App\Http\Controllers\VoteController@post',[$Request]);
    });
    Route::post('/comments/{comment}/like', function (Request $Request, \App\Comment $comments){
        $Request['type']='like';
        $Request['reference_to']='comments';
        $Request['referent_id']=$comments->id;
        return app()->call('App\Http\Controllers\VoteController@post',[$Request]);
    });
    Route::post('/comments/{comment}/dislike', function (Request $Request, \App\Comment $comment){
        $Request['type']='dislike';
        $Request['reference_to']='comments';
        $Request['referent_id']=$comment->id;
        return app()->call('App\Http\Controllers\VoteController@post',[$Request]);
    });
    Route::post('/forecasts/{forecast}/like', function (Request $Request, int $id){
        $Request['type']='like';
        $Request['reference_to']='forecasts';
        $Request['referent_id']=$id;
        return app()->call('App\Http\Controllers\VoteController@post',[$Request]);
    });
    Route::post('/forecasts/{forecast}/dislike', function (Request $Request, int $id){
        $Request['type']='dislike';
        $Request['reference_to']='forecasts';
        $Request['referent_id']=$id;
        return app()->call('App\Http\Controllers\VoteController@post',[$Request]);
    });
    Route::post('/posts/{post}/like', function (Request $Request, \App\Post $posts){
        $Request['type']='like';
        $Request['reference_to']='posts';
        $Request['referent_id']=$posts->id;
        return app()->call('App\Http\Controllers\VoteController@post',[$Request]);
    });
    Route::post('/posts/{post}/dislike', function (Request $Request, \App\Post $post){
        $Request['type']='dislike';
        $Request['reference_to']='posts';
        $Request['referent_id']=$post->id;
        return app()->call('App\Http\Controllers\VoteController@post',[$Request]);
    });

    Route::post('/news/{news}/comment', function (Request $Request, \App\News $news){
        $Request['reference_to']='news';
        $Request['referent_id']=$news->id;
        return app()->call('App\Http\Controllers\CommentController@post',[$Request]);
    });
    Route::post('/forecasts/{forecast}/comment', function (Request $Request, \App\Forecast $forecast){
        $Request['reference_to']='forecasts';
        $Request['referent_id']=$forecast->id;
        return app()->call('App\Http\Controllers\CommentController@post',[$Request]);
    });
    Route::post('/posts/{post}/comment', function (Request $Request, \App\Forecast $forecast){
        $Request['reference_to']='forecasts';
        $Request['referent_id']=$forecast->id;
        return app()->call('App\Http\Controllers\CommentController@post',[$Request]);
    });
    Route::post('/forecasts/{forecast}/follow', function (Request $Request, \App\Forecast $forecast){
        $Request['forecast_id']=$forecast->id;
        return app()->call('App\Http\Controllers\FollowForecastController@post',[$Request]);
    });
    Route::delete('/forecasts/{forecast}/follow', function (Request $Request, \App\Forecast $forecast){
        return app()->call('App\Http\Controllers\FollowForecastController@delete',[$forecast]);
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
