<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Bookmaker extends Model
{
    protected $guarded = ['id'];
    public $timestamps = false;
}
