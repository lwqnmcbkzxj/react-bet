<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;

class UploadController extends Controller
{
    public function putAvatar(Request $request)
    {
        $request->validate([
            'avatar'  =>  'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
        $image = $request->file('avatar');
        $name = ( Date::now()->toDateString()).'.'.($image->getClientOriginalExtension());
        $path = $image->move(public_path('/storage/users/'.($request->user()->id)),$name);
        $request->user()->avatar = '/storage/users/'.($request->user()->id).'/'.$name;
        $request->user()->save();
        return $this->sendResponse(['avatar'=>$request->user()->avatar],'Success',200);
    }
}
