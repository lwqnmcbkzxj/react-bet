<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Bookmaker extends Model
{
    protected $guarded = ['id'];
    protected $hidden = ['logo'];
    protected $appends = ['image'];
    function getImageAttribute()
    {
        return Storage::url('bookmakers/'. $this->logo);
    }
}
