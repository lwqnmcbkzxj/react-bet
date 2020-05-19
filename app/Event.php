<?php

namespace App;

use App\Http\Traits\Commentable;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use Commentable;
    const EVENT_STATUS_CANCELED = 0;
    const EVENT_STATUS_WAIT = 1;
    const EVENT_STATUS_FINISHED = 2;
    protected $appends = ['forecasts_count'];
    protected $guarded = ['id'];

    public function getForecastsCountAttribute()
    {
        return $this->forecasts()->count();
    }
    public function coefficients()
    {
        return $this->hasMany('App\Coefficient');
    }
    public function forecasts()
    {
        return $this->hasMany('App\Forecast', 'event_id','id');
    }
    public function championship() {
        return $this->hasOne('App\Championship', 'id', 'championship_id');
    }

    public function sport() {
        return $this->hasOne('App\Sport', 'id', 'sport_id');
    }
}
