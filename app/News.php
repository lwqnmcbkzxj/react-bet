<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $guarded = ['id'];
    protected $appends = ['comments', 'rating', 'count_comments','category_name'];
    protected $hidden = ['comments'];
    public function getCategoryNameAttribute()
    {
        return 'Спорт';
    }
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
    public function votes()
    {
        return $this->hasMany('App\Vote','referent_id', 'id')
            ->where('reference_to', '=', "news");
    }
    public function comments()
    {
        return $this->hasMany('App\Comment','referent_id', 'id')
            ->where('reference_to', '=', 'news');
    }
    public static function search($search) {
        return News::where('title','LIKE','%'.$search.'%')->orWhere('content','LIKE','%'.$search.'%');
    }
}
