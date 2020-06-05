<?php

namespace App\Http\Controllers;

use App\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function post(Request $request)
    {
        $feedback = new Feedback();
        $feedback->email = $request['email'];
        $feedback->text = $request['text'];
        $feedback->save();
        return $this->sendResponse($feedback, 'Success',200);
    }
    public function get()
    {
        return $this->sendResponse(Feedback::query()->paginate(),'Success',200);
    }
}
