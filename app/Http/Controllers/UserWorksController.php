<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserWorksController extends Controller
{
    public function getSubscribes($id) {
        $subscribes = DB::table('subscribers')
            ->select(
                'user_id as UserId',
                )
            ->where('subscriber_id', '=', $id)
            ->get();

        $return = [];
        foreach ($subscribes as $subscriber) {
            $return[] = $subscriber->UserId;
        }
        return $return;
    }
}
