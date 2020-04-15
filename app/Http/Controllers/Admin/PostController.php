<?php

namespace App\Http\Controllers\Admin;

use App\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.posts.index', [
            'posts' => Post::orderBy('id', 'desc')->paginate(10)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.posts.create', [
            'post' => []
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($request->has('meta_noindex')) {
            $post = Post::create($request->except('meta_noindex', 'is_published', 'preview'));
            $post->update([
                'meta_noindex' => 1
            ]);
        }
        else {
            $post = Post::create($request->except(['is_published', 'preview']));
            $post->update([
                'meta_noindex' => 0
            ]);
        }

        if ($request->has('is_published')) {
            $post->update([
                'is_published' => true
            ]);
        }
        else {
            $post->update([
                'is_published' => false
            ]);
        }

        if($file=$request->file('preview')){
            $name=time() . '-' . $file->getClientOriginalName();
            $file->move(public_path('storage/post/'.$post->id), $name);
            $image= '/storage/post/' . $post->id . '/' . $name;
            $post->update(['preview' => $image]);
        }

        return redirect()->route('admin.posts.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return view('single-post', [
            'post' => $post
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        return view('admin.posts.edit', [
            'post' => $post,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        if ($request->has('meta_noindex')) {
            $post->update($request->except('meta_noindex', 'is_published', 'preview'));
            $post->update([
                'meta_noindex' => 1
            ]);
        }
        else {
            $post->update($request->except(['is_published', 'preview']));
            $post->update([
                'meta_noindex' => 0
            ]);
        }


        if ($request->has('is_published')) {
            $post->update([
                'is_published' => true
            ]);
        }
        else {
            $post->update([
                'is_published' => false
            ]);
        }


        if($file=$request->file('preview')){
            $name=time() . '-' . $file->getClientOriginalName();
            $file->move(public_path('storage/post/'.$post->id), $name);
            $image= '/storage/post/' . $post->id . '/' . $name;
            $post->update(['preview' => $image]);
        }

        return redirect()->route('admin.posts.edit', $post);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('admin.posts.index');
    }
}
