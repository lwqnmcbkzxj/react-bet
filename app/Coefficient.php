<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Coefficient extends Model
{
    const COEFFICIENT_STATUS_BACK = 0;
    const COEFFICIENT_STATUS_WAIT = 1;
    const COEFFICIENT_STATUS_WIN = 2;
    const COEFFICIENT_STATUS_LOSE = 3;

    protected $guarded = ['id'];
    protected $appends = ['forecasts_count'];

    public function getForecastsCountAttribute()
    {
        return $this->forecasts_count = $this->forecasts()->count();
    }

    public function forecasts()
    {
        return $this->hasMany('App\forecast', 'coefficient_id', 'id');
    }
}
