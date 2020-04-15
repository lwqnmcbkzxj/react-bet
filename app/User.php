<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use DB;

class User extends Authenticatable
{
    use Notifiable;

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
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function role() {
        return $this->hasOne('App\Role', 'id', 'role_id');
    }

    public function forecasts() {
        return $this->hasMany('App\Forecast');
    }

    public function events()
    {
        return $this->hasManyThrough('App\Event', 'App\Forecast', 'user_id', 'id');
    }

    public function roi($user_id) {
            $query = "SELECT ((SELECT IFNULL(SUM(forecasts.bet * coefficients.coefficient), 0) FROM forecasts, events, coefficients where users.id = forecasts.user_id AND events.id = forecasts.event_id AND events.status = 2 AND users.role_id = 2 AND coefficients.id = forecasts.coefficient_id AND coefficients.status = 2) - SUM(forecasts.bet)) / SUM(forecasts.bet) as roi
                    FROM users, forecasts, events
                    WHERE users.id = forecasts.user_id
                    AND events.id = forecasts.event_id
                    AND users.id = " . $user_id;

        return (float)DB::select($query)[0]->roi;
    }

    public function pureProfit($user_id) {
        $query = "SELECT DISTINCT (SELECT SUM(forecasts.bet * coefficients.coefficient) - SUM(forecasts.bet) FROM forecasts, events, coefficients where users.id = forecasts.user_id AND events.id = forecasts.event_id AND events.status = 2 AND users.role_id = 2 AND coefficients.id = forecasts.coefficient_id AND coefficients.status = 2) as pure_profit
                FROM users, forecasts, events
                WHERE users.id = forecasts.user_id
                AND events.id = forecasts.event_id
                AND users.id = " . $user_id;

        if ($result = DB::select($query)) {
            return (float)DB::select($query)[0]->pure_profit;
        }
        else {
            return false;
        }

    }

    public function stats($user_id) {
        $query = "SELECT
                COUNT(forecasts.id) AS `count_forecasts`,
                (SELECT COUNT(coefficients.id) FROM coefficients, forecasts WHERE users.id = forecasts.user_id AND coefficients.id = forecasts.coefficient_id AND coefficients.status = 2) as `count_win`,
                (SELECT COUNT(coefficients.id) FROM coefficients, forecasts WHERE users.id = forecasts.user_id AND coefficients.id = forecasts.coefficient_id AND coefficients.status = 3) as `count_lose`,
                (SELECT COUNT(coefficients.id) FROM coefficients, forecasts WHERE users.id = forecasts.user_id AND coefficients.id = forecasts.coefficient_id AND coefficients.status = 0) as `count_back`,
                (SELECT COUNT(coefficients.id) FROM coefficients, forecasts WHERE users.id = forecasts.user_id AND coefficients.id = forecasts.coefficient_id AND coefficients.status = 1) as `count_wait`
                FROM users, forecasts, events
                WHERE users.id = forecasts.user_id
                AND events.id = forecasts.event_id
                AND users.id = " . $user_id;

        return DB::select($query)[0];
    }

    public function ratingPosition($user_id) {
        $query = "SELECT DISTINCT users.*, 
                (SELECT SUM(forecasts.bet * coefficients.coefficient) - SUM(forecasts.bet) FROM forecasts, events, coefficients where users.id = forecasts.user_id AND events.id = forecasts.event_id AND events.status = 2 AND users.role_id = 2 AND coefficients.id = forecasts.coefficient_id AND coefficients.status = 2) / SUM(forecasts.bet) as roi,
                COUNT(forecasts.id) AS `count_forecasts`,
                (SELECT COUNT(coefficients.id) FROM coefficients, forecasts WHERE users.id = forecasts.user_id AND coefficients.id = forecasts.coefficient_id AND coefficients.status = 2) as `count_win`,
                (SELECT COUNT(coefficients.id) FROM coefficients, forecasts WHERE users.id = forecasts.user_id AND coefficients.id = forecasts.coefficient_id AND coefficients.status = 3) as `count_lose`,
                (SELECT COUNT(coefficients.id) FROM coefficients, forecasts WHERE users.id = forecasts.user_id AND coefficients.id = forecasts.coefficient_id AND coefficients.status = 0) as `count_back`,
                (SELECT COUNT(coefficients.id) FROM coefficients, forecasts WHERE users.id = forecasts.user_id AND coefficients.id = forecasts.coefficient_id AND coefficients.status = 1) as `count_wait`
                FROM users, forecasts, events
                WHERE users.id = forecasts.user_id
                AND events.id = forecasts.event_id
                AND users.role_id = 2
                GROUP BY users.id
                ORDER BY roi DESC";

        $users = DB::select($query);

        foreach ($users as $position => $user) {
            if ($user->id === $user_id) {
                return ++$position;
            }
        }
    }

    public function subscriptions() {
        return $this->belongsToMany('App\User', 'subscribers', 'user_id', 'subscriber_id');
    }

    public function subscribers() {
        return $this->belongsToMany('App\User', 'subscribers', 'subscriber_id', 'user_id');
    }
}
