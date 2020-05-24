<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

// Регистрация

Route::post('/register', 'RegisterController@register');
// Прогнозы
Auth::routes();;

// Прогнозы
Route::get('/parser/add/users', 'Api\ForecastController@addUsers');
Route::get('/parser/add/forecasts', 'Api\ForecastController@addForecast');
Route::get('/parser/get/forecasts/status', 'Api\ForecastController@getForecastStatus');
Route::get('/get/news', 'Api\NewsController@getNews');


// Прогнозы
Route::get('/bookmakers', function () {
    return \App\Bookmaker::all(['id', 'title', 'rating', 'bonus', 'logo', 'link']);
});

Route::get('/bookmakers/{bookmaker}', function (\App\Bookmaker $bookmaker) {
    return $bookmaker;
});


Route::get('/forecasts', 'Api\InfoController@forecastsFast');
Route::get('/forecasts/{forecast}', 'Api\InfoController@forecast');
Route::get('/forecasts/{forecast}/comments', function (Request $Request, \App\Forecast $forecast) {
    $Request['reference_to'] = 'forecasts';
    $Request['referent_id'] = $forecast->id;
    return app()->call('App\Http\Controllers\CommentController@getAll', [$Request]);
});
Route::get('/comments', 'CommentController@get');
Route::get('/comments/{comment}', 'CommentController@getOne');

Route::get('/votes', 'VoteController@get');

Route::get('/news', 'Api\InfoController@news');
Route::get('/news/{news}', 'Api\InfoController@news');

Route::get('/sports', function () {
    return \App\Sport::all();
});
Route::get('/options', function () {
    return \App\Option::all();
});
Route::get('/roles', function () {
    return \App\Role::all();
});

Route::get('/events', 'EventController@getAll');
Route::get('/events/{event}', 'EventController@get');
Route::get('/events/{event}/comments', function (Request $Request, \App\Event $event) {
    $Request['reference_to'] = 'events';
    $Request['referent_id'] = $event->id;
    return app()->call('App\Http\Controllers\CommentController@getAll', [$Request]);
});
Route::get('/posts', 'PostController@getAll');
Route::get('/posts/{post}', 'PostController@get');
Route::get('/posts/{post}/comments', function (Request $Request, \App\Post $post) {
    $Request['reference_to'] = 'posts';
    $Request['referent_id'] = $post->id;
    return app()->call('App\Http\Controllers\CommentController@getAll', [$Request]);
});
Route::get('/news/{news}/comments', function (Request $Request, \App\News $news) {
    $Request['reference_to'] = 'news';
    $Request['referent_id'] = $news->id;
    return app()->call('App\Http\Controllers\CommentController@getAll', [$Request]);
});


//Доступ к профилям пользователей
Route::middleware('auth:api')->group(function () {
    Route::get('/admin/posts', 'PostController@getAll');
    Route::get('/admin/posts/search', 'PostController@search');
    Route::get('/admin/posts/{post}', 'PostController@get');
    Route::delete('/admin/posts/{post}', 'PostController@delete');
    Route::post('/admin/posts/{post}', 'PostController@edit');
    Route::post('/admin/posts', 'PostController@post');
    Route::get('/admin/news', 'NewsController@getAll');
    Route::get('/admin/news/search', 'NewsController@search');
    Route::get('/admin/news/{news}', 'NewsController@get');
    Route::delete('/admin/news/{news}', 'NewsController@delete');
    Route::post('/admin/news/{news}', 'NewsController@edit');
    Route::post('/admin/news', 'NewsController@post');
    Route::get('/admin/bookmakers', 'BookmakerController@getAll');
    Route::get('/admin/bookmakers/search', 'BookmakerController@search');
    Route::get('/admin/bookmakers/{bookmaker}', 'BookmakerController@get');
    Route::delete('/admin/bookmakers/{bookmaker}', 'BookmakerController@delete');
    Route::post('/admin/bookmakers', 'BookmakerController@post');
    Route::post('/admin/bookmakers/{bookmaker}', 'BookmakerController@edit');

    Route::post('/comments', 'CommentController@post');
    Route::delete('/comments/{comment}', 'CommentController@delete');
    Route::post('/votes', 'VoteController@post');
    Route::delete('/votes/{vote}', 'VoteController@delete');

    Route::get('/users/profile', 'ProfileController@index')->name('profile');
    Route::post('/users/update/login', 'ProfileController@updateLogin')->name('update.login');
    Route::post('/users/update/email', 'ProfileController@updateEmail')->name('update.email');
    Route::post('/users/update/password', 'ProfileController@updatePassword')->name('update.password');
    Route::post('/users/update/notification', 'ProfileController@updateNotification')->name('update.notification');
    Route::post('/users/{user}/subscription', 'UserSubscriptionController@create');
    Route::delete('/users/{user}/subscription', 'UserSubscriptionController@delete');

    Route::post('/news/{news}/like', function (Request $Request, \App\News $news) {
        $Request['type'] = 'like';
        $Request['reference_to'] = 'news';
        $Request['referent_id'] = $news->id;
        return app()->call('App\Http\Controllers\VoteController@post', [$Request]);
    });
    Route::post('/news/{news}/dislike', function (Request $Request, \App\News $news) {
        $Request['type'] = 'dislike';
        $Request['reference_to'] = 'news';
        $Request['referent_id'] = $news->id;
        return app()->call('App\Http\Controllers\VoteController@post', [$Request]);
    });
    Route::post('/comments/{comment}/like', function (Request $Request, \App\Comment $comments) {
        $Request['type'] = 'like';
        $Request['reference_to'] = 'comments';
        $Request['referent_id'] = $comments->id;
        return app()->call('App\Http\Controllers\VoteController@post', [$Request]);
    });
    Route::post('/comments/{comment}/dislike', function (Request $Request, \App\Comment $comment) {
        $Request['type'] = 'dislike';
        $Request['reference_to'] = 'comments';
        $Request['referent_id'] = $comment->id;
        return app()->call('App\Http\Controllers\VoteController@post', [$Request]);
    });
    Route::post('/forecasts/{forecast}/like', function (Request $Request, int $id) {
        $Request['type'] = 'like';
        $Request['reference_to'] = 'forecasts';
        $Request['referent_id'] = $id;
        return app()->call('App\Http\Controllers\VoteController@post', [$Request]);
    });
    Route::post('/forecasts/{forecast}/dislike', function (Request $Request, int $id) {
        $Request['type'] = 'dislike';
        $Request['reference_to'] = 'forecasts';
        $Request['referent_id'] = $id;
        return app()->call('App\Http\Controllers\VoteController@post', [$Request]);
    });
    Route::post('/posts/{post}/like', function (Request $Request, \App\Post $posts) {
        $Request['type'] = 'like';
        $Request['reference_to'] = 'posts';
        $Request['referent_id'] = $posts->id;
        return app()->call('App\Http\Controllers\VoteController@post', [$Request]);
    });
    Route::post('/posts/{post}/dislike', function (Request $Request, \App\Post $post) {
        $Request['type'] = 'dislike';
        $Request['reference_to'] = 'posts';
        $Request['referent_id'] = $post->id;
        return app()->call('App\Http\Controllers\VoteController@post', [$Request]);
    });

    Route::post('/news/{news}/comment', function (Request $Request, \App\News $news) {
        $Request['reference_to'] = 'news';
        $Request['referent_id'] = $news->id;
        return app()->call('App\Http\Controllers\CommentController@post', [$Request]);
    });
    Route::post('/forecasts/{forecast}/comment', function (Request $Request, \App\Forecast $forecast) {
        $Request['reference_to'] = 'forecasts';
        $Request['referent_id'] = $forecast->id;
        return app()->call('App\Http\Controllers\CommentController@post', [$Request]);
    });
    Route::post('/posts/{post}/comment', function (Request $Request, \App\Forecast $forecast) {
        $Request['reference_to'] = 'forecasts';
        $Request['referent_id'] = $forecast->id;
        return app()->call('App\Http\Controllers\CommentController@post', [$Request]);
    });
    Route::post('/forecasts/{forecast}/follow', function (Request $Request, \App\Forecast $forecast) {
        $Request['forecast_id'] = $forecast->id;
        return app()->call('App\Http\Controllers\FollowForecastController@post', [$Request]);
    });
    Route::delete('/forecasts/{forecast}/follow', function (Request $Request, \App\Forecast $forecast) {
        return app()->call('App\Http\Controllers\FollowForecastController@delete', [$forecast]);
    });

});
Route::get('/users', 'Api\InfoController@fastForecasters');
Route::get('/users/{user}', 'Api\InfoController@forecaster');
Route::get('/users/{user}/stats', 'Api\InfoController@userStatistic');
Route::get('/users/{user}/forecasts', 'Api\InfoController@userForecasts');
Route::get('/users/{user}/followed_forecasts', function (Request $request, \App\User $user) {
    if (!$request->has('limit')) {
        $request['limit'] = 6;
    }
    return new \App\Http\Resources\ForecastCollection($user->follow_forecasts()->paginate($request['limit']));
});
Route::get('/users/{user}/subscription', 'UserSubscriptionController@getSubscriptions');
Route::get('/users/{user}/subscribers', 'UserSubscriptionController@getSubscribers');


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
