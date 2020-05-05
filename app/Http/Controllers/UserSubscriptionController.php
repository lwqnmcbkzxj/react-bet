<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\GetAllNewsRequest;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserSubscriptionController extends Controller
{
    public function create(Request $request, User $user)
    {
        if ($auth_user = Auth::user()) {
            if (!$user->subscribers()->find($auth_user)) {
                $user->subscribers()->attach($auth_user);
            }
            else {
                return $this->sendError('Already subscribed', 400);
            }
        }
        else {
            return $this->sendError('Unauthorized', 402);
        }
        return $this->sendResponse([], 'Успешно подписан', 200);
    }
    public function getSubscribers(User $user)
    {

        if ($auth_user = Auth::user()) {
            return $this->sendResponse($user->subscribers()->get(),'Success', 200);
        }
        else {
            return $this->sendError('Unauthorized', 402);
        }
    }
    public function getSubscriptions(User $user)
    {
        if ($auth_user = Auth::user()) {
            return $this->sendResponse($user->subscriptions()->get(),'Success', 200);
        }
        else {
            return $this->sendError('Unauthorized', 402);
        }
    }
    public function delete(User $user)
    {
    }

}
