<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    const ROLE_USER = 1;
    const ROLE_FORECASTER_ROBOT = 2;
    const ROLE_MODERATOR = 3;
    const ROLE_ADMIN = 4;
    const ROLE_TECH_ADMIN = 5;


    protected $guarded = ['id'];
}
