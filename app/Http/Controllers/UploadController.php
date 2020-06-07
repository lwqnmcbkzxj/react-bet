<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;

class UploadController extends Controller
{
    public function putAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
        $image = $request->file('avatar');
        $name = time() . '.' . ($image->getClientOriginalExtension());
        $path = $image->move(public_path('/storage/users/' . ($request->user()->id)), $name);
        $request->user()->avatar = '/storage/users/' . ($request->user()->id) . '/' . $name;
        $request->user()->save();
        return $this->sendResponse(['avatar' => $request->user()->avatar], 'Success', 200);
    }

    public function putPostPreview(Request $request, Post $post)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
        $image = $request->file('image');
        $name = time().'.'. ($image->getClientOriginalExtension());
        $image->move(public_path('/storage/posts/' . $post->id), $name);
        $post->image = '/storage/posts/' . ($post->id) . '/' . $name;
        $post->save();
        return $this->sendResponse(['image' => $post->image], 'Success', 200);
    }
}
