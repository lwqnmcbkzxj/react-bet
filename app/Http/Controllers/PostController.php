<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    function getAll(Request $request)
    {
        return $this->search($request);
    }

    function get(Request $request, Post $post)
    {
        return $this->sendResponse(new \App\Http\Resources\Post($post),'Success',200);
    }

    function delete(Request $request, Post $post)
    {
        $post->delete();
        return $this->sendResponse("", "Success deleted", 200);
    }

    function search(Request $request)
    {
        $res = Post::query();
        if($request->has('search')&&$request->has('search_by') && ($request['search']!='' && $request['search_by']!=''))
        {
            $res = $res->where($request->search_by, 'LIKE', "%" . $request->search . "%");
        }
        if (!$request->has('order_by')) {
            $request['order_by'] = 'id';
        }
        if (!$request->has('limit')) {
            $request['limit'] = 16;
        }
        return $this->sendResponse(new \App\Http\Resources\PostCollection($res->orderBy($request['order_by'], 'desc')->paginate($request['limit'])),'Success',200);
    }

    function edit(Request $request, Post $post)
    {
        $post->title = $request['title'];
        $post->content = $request['content'];
        $post->image = $request['image'];
        $post->modified_by = Auth::user()->id;
        $post->is_published = $request['is_published'];
        $post->category_name = $request['category_name'];
        $post->save();
        return new \App\Http\Resources\Post($post);
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
        $post->category_name = $request['category_name'];
        $post->save();
        return new \App\Http\Resources\Post($post);
    }

}
