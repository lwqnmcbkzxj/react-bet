<?php

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

Route::get('/', 'ShowController@index')->name('page.index')->middleware('email.exists');
Route::get('/forecasts', 'ShowController@forecasts')->name('page.forecasts')->middleware('email.exists');
Route::get('/rating', 'ShowController@rating')->name('page.rating')->middleware('email.exists');
Route::get('/posts', 'ShowController@posts')->name('page.posts')->middleware('email.exists');
Route::resource('/posts', 'Admin\PostController')->only([
    'show'
])->middleware('email.exists');
Route::resource('/bookmakers', 'Admin\BookmakerController')->only([
    'show'
])->middleware('email.exists');
Route::get('/news', 'ShowController@news')->name('page.news')->middleware('email.exists');
Route::resource('/page', 'Admin\PageController')->only([
    'show'
])->middleware('email.exists');
Route::get('/feedback', 'ShowController@feedback')->name('page.feedback');
Route::post('/users/{user}/subscribe', 'Admin\UserController@subscribe')->name('users.subscribe');
Route::resource('/users', 'Admin\UserController')->only([
    'show'
])->middleware('email.exists');
Route::get('/bookmakers', 'ShowController@bookmakers')->name('page.bookmakers')->middleware('email.exists');

// Search
Route::get('/search', 'SearchController@search')->name('search')->middleware('email.exists');

// CKEDITOR
Route::post('ckeditor/image_upload', 'CKEditor\CKEditorController@upload')->name('upload');

// Socialite
Route::get('login/vk', 'Auth\LoginController@redirectToProviderVK')->name('login.vk');
Route::get('login/vk/callback', 'Auth\LoginController@handleProviderCallbackVK');

Route::get('login/facebook', 'Auth\LoginController@redirectToProviderFacebook')->name('login.facebook');
Route::get('login/facebook/callback', 'Auth\LoginController@handleProviderCallbackFacebook');

Route::get('login/google', 'Auth\LoginController@redirectToProviderGoogle')->name('login.google');
Route::get('login/google/callback', 'Auth\LoginController@handleProviderCallbackGoogle');

Auth::routes();

Route::get('/profile', 'ProfileController@index')->name('profile');
Route::post('/update/login', 'ProfileController@updateLogin')->name('update.login');
Route::post('/update/email', 'ProfileController@updateEmail')->name('update.email');
Route::post('/update/notification', 'ProfileController@updateNotification')->name('update.notification');

Route::group([
    'prefix' => 'admin',
    'middleware' => 'moderator',
    'namespace' => 'Admin',
    'as' => 'admin.'
], function (){
    Route::get('/', 'DashboardController@index')->name('index');
    Route::resource('/menu', 'MenuController')->middleware('admin');
    Route::get('/options', 'OptionController@index')->name('options')->middleware('admin');
    Route::post('/options/update', 'OptionController@update')->name('options.update')->middleware('admin');
    Route::get('/forecasts/user/{user}', 'ForecastController@userForecasts')->name('forecasts.user');
    Route::get('/forecasts/search', 'ForecastController@search')->name('forecasts.search');
    Route::resource('/forecasts', 'ForecastController');
    Route::get('/events/search', 'EventController@search')->name('events.search');
    Route::resource('/events', 'EventController');
    Route::resource('/championships', 'ChampionshipController');
    Route::resource('/banners', 'BannerController')->middleware('admin');
    Route::resource('/page', 'PageController')->except([
        'show'
    ]);
    Route::resource('/posts', 'PostController')->except([
        'show'
    ]);
    Route::resource('/bookmakers', 'BookmakerController')->except([
        'show'
    ]);
    Route::get('/users/search', 'UserController@search')->name('users.search');
    Route::resource('/users', 'UserController')->except([
        'show'
    ])->middleware('admin');
    Route::post('/users/export', 'DashboardController@exportUsers')->name('users.export');
});