<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Forecast;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\GetAllForecasts;
use App\Http\Requests\GetAllForecastBySport;
use App\Http\Requests\GetAllForecastByUser;

class ForecastController extends Controller
{
    public function getAll(GetAllForecasts $request) {
        $quanity = $request->quanity;
        $page = $request->page;

        $forecasts = DB::table('forecasts')
            ->join('users', 'forecasts.user_id', '=', 'users.id')
            ->join('events', 'forecasts.event_id', '=', 'events.id')
            ->join('coefficients', 'forecasts.coefficient_id', '=', 'coefficients.id')
            ->join('championships', 'events.championship_id', '=', 'championships.id')
            ->join('sports', 'events.sport_id', '=', 'sports.id')
            ->select(
                'users.login as UserName',
                'users.avatar as UserAvatar',
                'sports.name as SportName',
                'championships.name as Tournament',
                'forecasts.id as ForecastId',
                'events.start as Time',
                'forecasts.forecast as Text',
                'forecasts.bet as BetValue',
                'forecasts.created_at as CratedAt',
                'coefficients.coefficient as Coefficient'
                )
            ->limit($quanity)->offset($quanity*$page)
            ->get();


        return $forecasts;
        
    }

    public function getOne($id) {

        $forecasts = DB::table('forecasts')
            ->join('users', 'forecasts.user_id', '=', 'users.id')
            ->join('events', 'forecasts.event_id', '=', 'events.id')
            ->join('coefficients', 'forecasts.coefficient_id', '=', 'coefficients.id')
            ->join('championships', 'events.championship_id', '=', 'championships.id')
            ->join('sports', 'events.sport_id', '=', 'sports.id')
            ->select(
                'users.login as UserName',
                'users.avatar as UserAvatar',
                'sports.name as SportName',
                'championships.name as Tournament',
                'forecasts.id as ForecastId',
                'events.start as Time',
                'forecasts.forecast as Text',
                'forecasts.bet as BetValue',
                'forecasts.created_at as CratedAt',
                'coefficients.coefficient as Coefficient'
                )
            ->where('forecasts.id', '=', $id)
            ->get(0);

        return $forecasts;
        
    }

    public function getBySport(GetAllForecastBySport $request) {
        $quanity = $request->quanity;
        $page = $request->page;
        $sport = $request->sport_id;
        $forecasts = DB::table('forecasts')
            ->join('users', 'forecasts.user_id', '=', 'users.id')
            ->join('events', 'forecasts.event_id', '=', 'events.id')
            ->join('coefficients', 'forecasts.coefficient_id', '=', 'coefficients.id')
            ->join('championships', 'events.championship_id', '=', 'championships.id')
            ->join('sports', 'events.sport_id', '=', 'sports.id')
            ->select(
                'users.login as UserName',
                'users.avatar as UserAvatar',
                'sports.name as SportName',
                'championships.name as Tournament',
                'forecasts.id as ForecastId',
                'events.start as Time',
                'forecasts.forecast as Text',
                'forecasts.bet as BetValue',
                'forecasts.created_at as CratedAt',
                'coefficients.coefficient as Coefficient'
                )
            ->where('events.sport_id', '=', $sport)
            ->limit($quanity)->offset($quanity*$page)
            ->get();

        return $forecasts;
    }

    public function getByUser(GetAllForecastByUser $request) {
        $quanity = $request->quanity;
        $page = $request->page;
        $user = $request->user_id;
        
        $forecasts = DB::table('forecasts')
            ->join('users', 'forecasts.user_id', '=', 'users.id')
            ->join('events', 'forecasts.event_id', '=', 'events.id')
            ->join('coefficients', 'forecasts.coefficient_id', '=', 'coefficients.id')
            ->join('championships', 'events.championship_id', '=', 'championships.id')
            ->join('sports', 'events.sport_id', '=', 'sports.id')
            ->select(
                'users.login as UserName',
                'users.avatar as UserAvatar',
                'sports.name as SportName',
                'championships.name as Tournament',
                'forecasts.id as ForecastId',
                'events.start as Time',
                'forecasts.forecast as Text',
                'forecasts.bet as BetValue',
                'forecasts.created_at as CratedAt',
                'coefficients.coefficient as Coefficient'
                )
            ->where('forecasts.user_id', '=', $user)
            ->limit($quanity)->offset($quanity*$page)
            ->get();

        return $forecasts;
    }
}
