<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;

class UserStats extends Model
{
    protected $table = 'user_stats_view';
    protected $primaryKey = 'user_id';
    protected $hidden = ['user_id'];
    public function user()
   {
       return $this->belongsTo('App\User', 'user_id', 'id');
   }
}
