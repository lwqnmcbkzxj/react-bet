<?php

namespace App;

use ErrorException;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\DB;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'login', 'role_id', 'email', 'password', 'uid', 'balance', 'avatar', 'provider', 'provider_id', 'is_email_notification', 'is_push_notification'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = [
        'rating_position', 'stats', 'last_five'
    ];

    public function getCountSubscribersAttribute()
    {
        return $this->subscribers()->count();
    }

    public function getRatingPositionAttribute()
    {
        return $this->ratingPosition();
    }

    public function hasSubscription(int $id)
    {
        return !is_null($this->forecasts()->find($id));
    }

    public function getCountForecastsAttribute()
    {
        return $this->forecasts()->count();
    }

    public function getStatsAttribute()
    {
        return $this->stats()->first();
    }

    public function getCountFollowForecastsAttribute()
    {
        return $this->follow_forecasts()->count();
    }

    public function getFollowForecastsAttribute()
    {
        return $this->follow_forecasts();
    }

    public function role()
    {
        return $this->hasOne('App\Role', 'id', 'role_id');
    }

    public function getLastFiveAttribute()
    {
        return self::getLastFive($this->id);
    }

    public static function getLastFive($user_id)
    {
        $query = 'SELECT (`status`) as status
FROM `forecasts` LEFT JOIN `coefficients`
on `forecasts`.`coefficient_id` = `coefficients`.`id`
WHERE `forecasts`.`user_id` = ? and ( `coefficients`.status = 3 or `coefficients`.status = 2) LIMIT 5';
        $response = collect(DB::select($query, [$user_id]));
        $res = [];
        foreach ($response as $index => $item) {
            $res[] = $item->status == 2;
        }
        return $res;
    }

    public function forecasts()
    {
        return $this->hasMany('App\Forecast');
    }

    public function follow_forecasts()
    {
        return $this->hasManyThrough('App\Forecast', 'App\FollowForecasts', 'follow_forecasts.user_id', 'id');
    }

    public function events()
    {
        return $this->hasManyThrough('App\Event', 'App\Forecast', 'user_id', 'id');
    }

    public function ratingPosition()
    {
        $query = "SELECT `rating_position` FROM `user_rating_view` WHERE `user_id` = ?";
        return (int)DB::select($query, [$this->id])[0]->rating_position;
    }

    public function subscriptions()
    {
        return $this->belongsToMany('App\User', 'subscribers', 'user_id', 'subscriber_id');
    }

    public function subscribers()
    {
        return $this->belongsToMany('App\User', 'subscribers', 'subscriber_id', 'user_id');
    }

    public function votes()
    {
        return $this->hasMany('App\Vote', 'user_id');
    }

    public function stats()
    {
        return $this->hasOne('App\UserStats', 'user_id');
    }
}
