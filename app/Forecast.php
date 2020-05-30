<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Http\Resources\UserData as UserResource;
class Forecast extends Model
{
    public const MAX_DESCRIPTION_SIZE = 297;
    protected $guarded = ['id'];
    protected $appends = ['comments', 'count_comments', 'rating' ,'description', 'user_data', 'event'];
    protected $hidden = ['comments','event'];

    public function getUserDataAttribute()
    {
        return $this->user_data = new UserResource($this->user()->first());
    }
    public function getEventAttribute()
    {
        return $this->event = $this->event()->first();
    }
    public function getDescriptionAttribute()
    {
        return $this->description = substr($this->forecast_text, $this->MAX_DESCRIPTION_SIZE) . "...";
    }
    public function getCommentsAttribute()
    {
        return $this->comments = $this->comments()->get();
    }
    public function getCountCommentsAttribute()
    {
        return $this->count_comments = $this->comments()->count();
    }
    public function getRatingAttribute()
    {
        return $this->rating = $this->votes()->where('type','=','like')->count() - $this->votes()->where('type','=','dislike')->count();
    }
    public function votes()
    {
        return $this->hasMany('App\Vote','referent_id', 'id')
            ->where('reference_to', '=', "forecasts");
    }

    public function user() {
        return $this->hasOne('App\User', 'id', 'user_id');
    }

    public function event() {
        return $this->hasOne('App\Event', 'id', 'event_id');
    }

    public function comments()
    {
        return $this->hasMany('App\Comment','referent_id', 'id')
            ->where('reference_to', '=', 'forecasts');
    }
    public function subscribers()
    {
        return $this->hasManyThrough('App\User', 'App\FollowForecasts', 'id', 'follow_forecasts.forecast_id');
    }

    public function coefficient() {
        return $this->hasOne('App\Coefficient', 'id', 'coefficient_id');
    }

    public static function search($search) {
        return Forecast::query()->where('forecast','LIKE','%'.$search.'%');
    }
}
