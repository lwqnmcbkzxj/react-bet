<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Http\Controllers\Controller;
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
        return $this->sendResponse($comment, 'Success', 200);
    }
    public function getAll(Request $request)
    {
        $res = Comment::all();
        if($request->has('reference_to') && $request->has('referent_id'))
        {
            $res = $res->where('reference_to', '=', $request['reference_to'])->where('referent_id', '=',  $request['referent_id']);
        }
        return $this->sendResponse(collect($res)->flatten(), 'Success', 200);
    }
    public function get(Comment $comment)
    {
        return $comment;
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
