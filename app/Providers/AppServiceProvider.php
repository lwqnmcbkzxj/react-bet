<?php

namespace App\Providers;

use App\Comment;
use App\Forecast;
use App\Http\Controllers\FCMController;
use App\Vote;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        JsonResource::withoutWrapping();
        Vote::created(function ($vote)
        {
            FCMController::sendVoteNotification($vote);
            return $vote->isValid();
        });
        Comment::created(function ($comment)
        {
            FCMController::sendCommentNotification($comment);
            return $comment->isValid();
        });
        Forecast::created(function ($forecast)
        {
            FCMController::sendNewForecastNotification($forecast);
            return $forecast->isValid();
        });
    }
}
