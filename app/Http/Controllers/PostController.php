<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    function getAll(Request $request)
    {
        if (!$request->has('order_by')) {
            $request['order_by'] = 'id';
        }
        if (!$request->has('limit')) {
            $request['limit'] = 'limit';
        }
        return Post::query()->orderBy($request['order_by'])->paginate($request['limit']);
    }

    function get(Request $request, Post $post)
    {
        return $post;
    }

    function delete(Request $request, Post $post)
    {
        $post->delete();
        return $this->sendResponse("", "Success deleted", 200);
    }

    function search(Request $request)
    {
        if (!$request->has('order_by')) {
            $request['order_by'] = 'id';
        }
        if (!$request->has('limit')) {
            $request['limit'] = 'limit';
        }
        return Post::query()->where($request->search_by, 'LIKE', "%" . $request->search . "%")->orderBy($request['order_by'])->paginate($request['limit']);
    }

    function edit(Request $request, Post $post)
    {
        $post->title = $request['title'];
        $post->content = $request['content'];
        $post->image = $request['image'];
        $post->modified_by = Auth::user()->id;
        $post->is_published = $request['is_published'];
        $post->save();
        return $post;
    }

    function post(Request $request)
    {
        $post = new Post();
        $post->title = $request['title'];
        $post->content = $request['content'];
        $post->image = $request['image'];
        $post->created_by = Auth::user()->id;
        $post->modified_by = Auth::user()->id;
        $post->is_published = $request['is_published'];
        $post->save();
        return $post;
    }

}
