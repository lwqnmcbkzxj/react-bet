<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Http\Controllers\Controller;
use App\Http\Resources\CommentCollection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PHPUnit\Exception;

class CommentController extends Controller
{
    public function post(Request $request)
    {
        $comment = new Comment();
        $user = Auth::user();
        $comment->text = $request->text;
        $comment->user_id = $user->id;
        $comment->reference_to = $request->reference_to;
        $comment->referent_id = $request->referent_id;
        if($request->has('replies_to'))
        {
            $comment->replies_to = $request->replies_to;
        }
        $comment->save();
        return $this->sendResponse(new \App\Http\Resources\Comment($comment), 'Success', 200);
    }
    public function getAll(Request $request)
    {
        $res = Comment::all();
        if($request->has('reference_to') && $request->has('referent_id'))
        {
            $res = $res->where('reference_to', '=', $request['reference_to'])->where('referent_id', '=',  $request['referent_id']);
        }
        if($request->has('order_by'))
        {
            if(!$request->has('direction'))
                $request['direction'] = 'DESC';
            if($request['direction']=='DESC')
                $res = $res->sortByDesc($request['order_by']);
            else
                $res = $res->sortBy($request['order_by']);
        }
        else
        {
            $res = $res->sortByDesc('id');
        }
        return $this->sendResponse(new \App\Http\Resources\CommentCollection($res), 'Success', 200);
    }
    public function getOne(Comment $comment)
    {
        return $this->sendResponse(new \App\Http\Resources\Comment($comment), 'Success', 200);
    }
    public function delete(Comment $comment)
    {
        try {
            $comment->delete();
            return $this->sendResponse('', 'Success', 200);
        } catch (\Exception $e) {
            return $this->sendError('Deletion ERROR', 400);
        }
    }
    //
}
