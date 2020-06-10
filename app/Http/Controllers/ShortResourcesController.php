<?php

namespace App\Http\Controllers;

use App\Championship;
use App\Event;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ShortResourcesController extends Controller
{
    public function users()
    {
        return $this->sendResponse(DB::table('users')->select(['id','login as value'])->get(),'Success',200);
    }

    public function events(Request $request)
    {
        $res = DB::table('events')->select(['id','title as value']);
        if($request->has('championship'))
        {
            $res = $res->where('championship_id','=',$request['championship']);
        }
        return $this->sendResponse($res->get(),'Success',200);
    }

    public function championships()
    {
        return $this->sendResponse(DB::table('championships')->select(['id','name as value'])->get(),'Success',200);
    }

}
