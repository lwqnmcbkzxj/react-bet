<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['text', 'referenced_to', 'referent_id', 'replies_to'];

    protected $appends = ['rating'];


    public function getRatingAttribute()
    {
        return $this->rating = $this->votes()->where('type', '=', 'like')->count() - $this->votes()->where('type', '=', 'dislike')->count();
    }

    public function votes()
    {
        return $this->hasMany('App\Vote', 'referent_id', 'id')
            ->where('reference_to', '=', "comments");
    }

    public function parent()
    {
        return $this->hasOne($this->reference_to, 'id', 'referent_id');
    }

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }
}
