<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Forecast extends Model
{
    protected $guarded = ['id'];

    public function user() {
        return $this->hasOne('App\User', 'id', 'user_id');
    }

    public function event() {
        return $this->hasOne('App\Event', 'id', 'event_id');
    }

    public function coefficient() {
        return $this->hasOne('App\Coefficient', 'id', 'coefficient_id');
    }

    public static function search($search) {
        return Forecast::where('forecast','LIKE','%'.$search.'%');
    }
}
