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
        $comment->save();
        return $this->sendResponse($comment, 'Success', 200);
    }
    public function get($request = null)
    {
        return Comment::all();
    }
    public function delete(Comment $comment)
    {
        try {
            $comment->delete();
            return $this->sendResponse('', 'Success', 200);
        } catch (\Exception $e) {
            return $this->sendError('Deletion ERROE', 400);
        }
    }
    //
}
