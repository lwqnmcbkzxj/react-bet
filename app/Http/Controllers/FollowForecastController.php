<?php

namespace App\Http\Controllers;

use App\FollowForecast;
use App\Http\Resources\Forecast;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowForecastController extends Controller
{
    public function post(Request $request)
    {
        $user = Auth::user();
        $follow_forecast = $user->follow_forecasts()->where('forecast_id', $request->forecast_id)->first();
        if(!$follow_forecast) {
            $follow_forecast = new FollowForecast();
            $follow_forecast->forecast_id = $request->forecast_id;
            $follow_forecast->user_id = $user->id;
            $follow_forecast->save();
        }
        else {
                try {
                    $follow_forecast->delete();
                    return $this->sendResponse([], 'Success', 200);;
                }
                catch(\Exception $exception)
                {
                    return $this->sendError('Deletion Error',400, $exception->getMessage());
                }
        }
        return $this->sendResponse($follow_forecast, 'Success', 200);
    }
    public function get($request = null)
    {
        return $this->sendResponse(Vote::all()->paginate(), 'Success',200);
    }
    public function delete(Forecast $forecast)
    {
        try {
            $forecast->delete();
            return $this->sendResponse('', 'Success', 200);
        } catch (\Exception $e) {
            return $this->sendError('Deletion ERROR', 400, $e->getMessage());
        }
    }
}
