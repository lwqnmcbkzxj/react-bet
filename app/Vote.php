<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    protected $fillable = ['type','referenced_to','referent_id'];
    public function user() {
        return $this->hasOne('App\User', 'id', 'user_id');
    }
}
