<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $guarded = ['id'];

    public static function search($search) {
        return Post::where('title','LIKE','%'.$search.'%')->orWhere('content','LIKE','%'.$search.'%');
    }
}
