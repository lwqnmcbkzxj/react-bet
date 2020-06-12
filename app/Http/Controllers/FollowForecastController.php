<?php

namespace App\Http\Controllers;

use App\FollowForecasts;
use App\Forecast;
use App\Http\Resources\FastForecastCollection;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FollowForecastController extends Controller
{
    public function post(Request $request, Forecast $forecast)
    {
        $user = $request->user();
        $follow_forecast = FollowForecasts::query()->where('user_id','=',$user->id)->where('forecast_id','=',$forecast->id)->first();
        if (!$follow_forecast) {
            $follow_forecast = new FollowForecasts();
            $follow_forecast->forecast_id = $forecast->id;
            $follow_forecast->user_id = $user->id;
            $follow_forecast->save();
            return $this->sendResponse($follow_forecast, 'Success', 200);
        } else {
            try {
                $follow_forecast->delete();
                return $this->sendResponse('Mark has been deleted', 'Success', 200);;
            } catch (\Exception $exception) {
                return $this->sendError('Deletion Error', 400, $exception->getMessage());
            }
        }
    }

    public function get(Request $request)
    {
        $user = $request->user();
        $res = DB::table('follow_forecasts')->leftJoin('forecasts_view', 'follow_forecasts.forecast_id', '=', 'forecasts_view.forecast_id')->where('follow_forecasts.user_id', '=', $user->id);
        if (!$request->has('limit') || $request['limit'] == 0) {
            $request['limit'] = 6;
        }
        if ($request->has('sport_id') && $request['sport_id'] != 0) {
            $res = $res->where('sport_id', '=', $request['sport_id']);
        }
        if (!$request->has('direction')) {
            $request['direction'] = 'desc';
        }
        if ($request->has('order_by')) {
            $res = $res->orderBy($request['order_by'], $request['direction']);
        }
        $res = $res->select(['forecasts_view.forecast_id as forecast_id',
            'forecasts_view.forecast_text as forecast_text',
            'forecasts_view.bet as bet',
            'forecasts_view.created_at as created_at',
            'forecasts_view.bookmaker_id as bookmaker_id',
            'forecasts_view.event_id as event_id',
            'forecasts_view.event_title as event_title',
            'forecasts_view.event_start as event_start',
            'forecasts_view.event_status as event_status',
            'forecasts_view.championship_id as championship_id',
            'forecasts_view.championship_name as championship_name',
            'forecasts_view.sport_id as sport_id',
            'forecasts_view.sport_name as sport_name',
            'forecasts_view.sport_logo as sport_logo',
            'forecasts_view.coefficients_id as coefficients_id',
            'forecasts_view.coefficient_type as coefficient_type',
            'forecasts_view.coefficient as coefficient',
            'forecasts_view.coefficients_status as coefficients_status',
            'forecasts_view.roi as roi',
            'forecasts_view.average_cofficient as average_cofficient',
            'forecasts_view.pure_profit as pure_profit',
            'forecasts_view.count_win as count_win',
            'forecasts_view.count_loss as count_loss',
            'forecasts_view.count_wait as count_wait',
            'forecasts_view.count_back as count_back',
            'forecasts_view.count_subscribers as count_subscribers',
            'forecasts_view.count_subscriptions as count_subscriptions',
            'forecasts_view.user_id as user_id',
            'forecasts_view.user_login as user_login',
            'forecasts_view.user_avatar as user_avatar',
            'forecasts_view.role_id as role_id',
            'forecasts_view.role_name as role_name',
            'forecasts_view.role_label as role_label',
            'forecasts_view.comments_count as comments_count',
            'forecasts_view.subscribers_count as subscribers_count',
            'forecasts_view.rating as rating']);
        return $this->sendResponse(new FastForecastCollection($res->paginate($request['limit'])), 'Success', 200);
    }

    public function delete(Request $request, Forecast $forecast)
    {
        try {
            $user = $request->user();
            FollowForecasts::query()->where('forecast_id', '=', $forecast->id)->where('user_id', '=', $user->id)->first()->delete();
            return $this->sendResponse('', 'Success', 200);
        } catch (\Exception $e) {
            return $this->sendError('Deletion ERROR', 400, $e->getMessage());
        }
    }
}
