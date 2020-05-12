<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['text','referenced_to','referent_id'];

    protected $appends = ['rating'];
    protected $hidden = ['comments'];

    public function getCommentsAttribute()
    {
        return $this->children = $this->comments()->get();
    }
    public function getRatingAttribute()
    {
        return $this->rating = $this->votes()->where('type','=','like')->count() - $this->votes()->where('type','=','dislike')->count();
    }
    public function votes()
    {
        return $this->hasMany('App\Vote','referent_id', 'id')
            ->where('reference_to', '=', "comments");
    }
    public function parent()
    {
        return $this->hasOne($this->reference_to,'id','referent_id');
    }
    public function comments()
    {
        return $this->hasMany('App\Comment','referent_id', 'id')
            ->where('reference_to', '=', "comments");
    }
    public function user() {
        return $this->hasOne('App\User', 'id', 'user_id');
    }
}
