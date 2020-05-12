<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Championship extends Model
{
    protected $guarded = ['id'];

    public function sport() {
        return $this->hasOne('App\Sport', 'id', 'sport_id');
    }
}
