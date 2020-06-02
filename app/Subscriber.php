<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Subscriber extends Model
{
    protected $table = 'subscribers';
    protected $guarded = ['id'];

    static public function checkSubscription(int $user_id, int $subscriber_id)
    {
        return boolval(DB::table('subscribers')->where('user_id', '=', $user_id)->where('subscriber_id', '=', $subscriber_id)->first());
    }
}
