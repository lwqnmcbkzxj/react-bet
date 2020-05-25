<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $guarded = ['id'];
    protected $appends = ['created_by_login', 'comments', 'rating', 'count_comments'];
    protected $hidden = ['comments'];
    public function getCommentsAttribute()
    {
        return $this->children = $this->comments()->get();
    }
    public function getCountCommentsAttribute()
    {
        return $this->count_comments = $this->comments()->count();
    }

    public function getRatingAttribute()
    {
        return $this->rating = $this->votes()->where('type','=','like')->count() - $this->votes()->where('type','=','dislike')->count();
    }
    public function getCreatedByLoginAttribute()
    {
        if(User::where('id', '=', $this->created_by)->first())
            return User::where('id', '=', $this->created_by)->first()['login'];
        else
            return "";
    }
    public function user()
    {
        return $this->hasOne('App\User', 'id', 'created_by');
    }
    public function votes()
    {
        return $this->hasMany('App\Vote','referent_id', 'id')
            ->where('reference_to', '=', "posts");
    }
    public function comments()
    {
        return $this->hasMany('App\Comment','referent_id', 'id')
            ->where('reference_to', '=', "comments");
    }
    public static function search($search) {
        return Post::where('title','LIKE','%'.$search.'%')->orWhere('content','LIKE','%'.$search.'%');
    }
}
