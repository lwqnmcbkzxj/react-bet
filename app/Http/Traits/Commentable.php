<?php
namespace App\Http\Traits;

trait Commentable
{
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
}
