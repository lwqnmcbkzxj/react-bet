<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FCMToken extends Model
{
    protected $table = 'fcm_tokens';
    public function user()
    {
        return $this->belongsTo('App\User', 'user_id','id');
    }
}
