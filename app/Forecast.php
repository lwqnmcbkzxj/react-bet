<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Http\Resources\User as UserResource;
class Forecast extends Model
{
    public const MAX_DESCRIPTION_SIZE = 297;
    protected $guarded = ['id'];
    protected $appends = ['comments', 'count_comments', 'count_likes', 'count_dislikes', 'description', 'user_data'];
    protected $hidden = ['comments', 'forecast', 'user_data'];

    public function getUserDataAttribute()
    {
        return $this->user_data = new UserResource($this->user()->first());
    }
    public function getDescriptionAttribute()
    {
        return $this->description = substr($this->forecast,$this->MAX_DESCRIPTION_SIZE) . "...";
    }
    public function getCommentsAttribute()
    {
        return $this->children = $this->comments()->get();
    }
    public function getCountCommentsAttribute()
    {
        return $this->count_comments = $this->comments()->count();
    }
    public function getCountLikesAttribute()
    {
        return $this->count_likes = $this->votes()->where('type','=','like')->count();
    }
    public function getCountDislikesAttribute()
    {
        return $this->count_likes = $this->votes()->where('type','=','dislike')->count();
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
    public function coefficient() {
        return $this->hasOne('App\Coefficient', 'id', 'coefficient_id');
    }
    public static function search($search) {
        return Forecast::where('forecast','LIKE','%'.$search.'%');
    }
}
