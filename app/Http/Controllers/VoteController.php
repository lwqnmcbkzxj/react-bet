<?php

namespace App\Http\Controllers;

use App\User;
use App\Vote;
use App\Http\Controllers\Controller;
use http\Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VoteController extends Controller
{
    public function post(Request $request)
    {
        $user = Auth::user();
        $vote = $user->votes()->where('referent_id', $request->referent_id);
        if(!$vote->exists()) {
            $vote = new Vote();
            $vote->type = $request->type;
            $vote->user_id = $user->id;
            $vote->reference_to = $request->reference_to;
            $vote = $request->referent_id;
            $vote->save();
        }
        else {
            if($vote->type == $request->type)
                try {
                    $vote->delete();
                }
                catch(\Exception $exception)
                {
                    return $this->sendError('Deletion Error',400, $exception->getMessage());
                }
        }
        return $this->sendResponse($vote, 'Success', 200);
    }
    public function get($request = null)
    {
        return $this->sendResponse(Vote::all()->paginate(), 'Success',200);
    }
    public function delete(Vote $comment)
    {
        try {
            $comment->delete();
            return $this->sendResponse('', 'Success', 200);
        } catch (\Exception $e) {
            return $this->sendError('Deletion ERROR', 400, $e->getMessage());
        }
    }
}
