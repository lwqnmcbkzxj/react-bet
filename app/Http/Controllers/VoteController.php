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
    public function postTo(Request $request, $referent_id, $reference_to)
    {
        $request->reference_to = $reference_to;
        $request->referent_id = $referent_id;
        return $this->post($request);
    }
    public function post(Request $request)
    {
        $user = User::find(Auth::id());
        $vote = $user->votes()->where('referent_id', $request->referent_id)->first();
        if(!$vote) {
            $vote = new Vote();
            $vote->type = $request->type;
            $vote->user_id = $user->id;
            $vote->reference_to = $request->reference_to;
            $vote->referent_id = $request->referent_id;
            $vote->save();
        }
        else {
            if($vote->type == $request->type)
                try {
                    $vote->delete();
                    return $this->sendResponse([], 'Success', 200);;
                }
                catch(\Exception $exception)
                {
                    return $this->sendError('Deletion Error',400, $exception->getMessage());
                }
            else
            {
                $vote->type = $request->type;
                $vote->save();
            }
        }
        return $this->sendResponse($vote, 'Success', 200);
    }
    public function get($request = null)
    {
        return $this->sendResponse(Vote::all()->paginate(), 'Success',200);
    }
    public function delete(Vote $vote)
    {
        try {
            $vote->delete();
            return $this->sendResponse('', 'Success', 200);
        } catch (\Exception $e) {
            return $this->sendError('Deletion ERROR', 400, $e->getMessage());
        }
    }
}
