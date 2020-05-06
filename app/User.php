<?php

namespace App;

use ErrorException;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use DB;
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
        'stats'
    ];
    public function  getRoiAttribute()
    {
        return $this->roi($this->id);
    }
    public function getCountSubscribersAttribute()
    {
        return $this->subscribers()->count();
    }
    public function getRatingPositionAttribute()
    {
        return $this->ratingPosition();
    }
    public function getPureProfitAttribute()
    {
        return $this->pureProfit($this->id);
    }
    public function getCountForecastsAttribute()
    {
        return $this->forecasts()->count();
    }
    public function getCountFollowForecastsAttribute()
    {
        return $this->follow_forecasts()->count();
    }
    public function getFollowForecastsAttribute()
    {
        return $this->follow_forecasts();
    }
    public function getStatsAttribute()
    {
        return $this->stats($this->id);
    }

    public function role()
    {
        return $this->hasOne('App\Role', 'id', 'role_id');
    }

    public function forecasts()
    {
        return $this->hasMany('App\Forecast');
    }
    public function follow_forecasts()
    {
        return $this->hasManyThrough('App\Forecast', 'App\FollowForecast', 'follow_forecasts.user_id', 'id');
    }
    public function events()
    {
        return $this->hasManyThrough('App\Event', 'App\Forecast', 'user_id', 'id');
    }

    public static function roi($user_id)
    {
        $query = "SELECT roi FROM user_stats_view WHERE user_id = ".$user_id;
        return (float)(DB::select($query)[0]->roi);
    }

    public static function pureProfit($user_id) {
        $query = "SELECT SUM(bet*(coefficient-1)) as pure_profit
                        FROM (`forecasts` LEFT JOIN `events` on `events`.`id` = `forecasts`.`event_id`)
                                            LEFT JOIN `coefficients` on `forecasts`.`coefficient_id` = `coefficients`.`id`
                        WHERE events.status = 2 AND forecasts.user_id =". $user_id;
        return (float)(DB::select($query)[0]->pure_profit);
    }

    public static function stats($user_id) {
        $query = "SELECT * FROM user_stats_view
                WHERE user_id = " . $user_id;
        return DB::select($query)[0];
    }

    public function ratingPosition() {
        $query = "SELECT count(*) as rating_position FROM user_stats_view WHERE roi >" .$this->roi;
        return (int) DB::select($query)[0]->rating_position;
    }

    public function subscriptions() {
        return $this->belongsToMany('App\User', 'subscribers', 'user_id', 'subscriber_id');
    }
    public function subscribers() {
        return $this->belongsToMany('App\User', 'subscribers', 'subscriber_id', 'user_id');
    }
    public function votes()
    {
        return $this->hasMany('App\Vote', 'user_id');
    }
}
