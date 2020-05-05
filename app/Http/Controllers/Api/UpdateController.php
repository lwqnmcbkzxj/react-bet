<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;

class UpdateController extends Controller
{
    public function updateUserSubscriptions(Request $request) {
        if ($request->has('user_id')) {
            $auth_user = User::where('id', $request->get('user_id'))->first();
            if (!$auth_user->subscriptions()->find($request->get('forecaster_id'))) {
                $auth_user->subscriptions()->attach($request->get('forecaster_id'));
                $response['status'] = 'subscribe';
                return json_encode($response);
            }
            else {
                $auth_user->subscriptions()->detach($request->get('forecaster_id'));
                $response['status'] = 'unsubscribe';
                return json_encode($response) ;
            }
        }
        else {
            $response['error'] = 'Пожалуйста авторизируйтесь';
            $response = json_encode($response);
            return $response;
        }
    }
}
