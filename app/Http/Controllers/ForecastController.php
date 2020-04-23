<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Forecast;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\GetAllForecastsRequest;
use App\Http\Requests\LikeForecastRequest;
use App\Http\Requests\CommentForecastReques;
use App\Http\Requests\AddToFavRequest;
use Carbon\Traits\Timestamp;
use Illuminate\Support\Facades\Auth;
use App\User;
use DateTime;

class ForecastController extends Controller
{
    public function getAll(GetAllForecastsRequest $request) {
         // taking sport
        $sport = $request->sport;
        
        // taking needl tf
        switch ($request->tf) {
            case '3h': $to = date('yy-m-d H:i:s', strtotime('-3 hours', time())); break;
            case '6h': $to = date('yy-m-d H:i:s', strtotime('-6 hours', time())); break;
            case '12h': $to = date('yy-m-d H:i:s', strtotime('-12 hours', time())); break;
            case 'day': $to = date('yy-m-d H:i:s', strtotime('-24 hours', time())); break;
            case 'all': $to = date('yy-m-d H:i:s', strtotime('-5000 hours', time())); break;
        }
        $now = date('yy-m-d H:i:s', time());
        

        // first stage of getting all forecast
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
                'coefficients.coefficient as Coefficient',
            )
            ->whereBetween('forecasts.created_at', [$to, $now])
            ->when($request->sport != 'all', function ($query) use ($sport){
                return $query->where('sports.id', '=', $sport);
            })
            // using favorites
            ->when($request->useFavorites == 1, function($query) {
                $favorites = DB::table('forecast_favorites')
                ->select('forecast_id')
                ->where('user_id', auth('api')->user()->id)
                ->get();
                foreach ($favorites as $item) {
                    $fav[] = $item->forecast_id;
                }
                return $query->whereIn('forecasts.id', $fav);
            }) 
            // using subs
            ->when($request->useSubscribes == 1, function($query) {
                $subsR = DB::table('subscribers')
                ->select('*')
                ->where('subscriber_id', auth('api')->user()->id)
                ->get();
                foreach ($subsR as $item) {
                    $subs[] = $item->user_id;
                }
                return $query->whereIn('forecasts.user_id', $subs);
            })
            ->limit($request->quanity)->offset($request->quanity*$request->page)
            ->get();

            // getting comments quanity
            $i = 0;
            foreach ($forecasts as $item){
                $comments = DB::table('forecast_comments')
                ->select('*')
                ->where('forecast_id', $item->ForecastId)
                ->count('*');
                empty($comments) ? 0 : $comments;
                $forecasts[$i]->CommentsQuanity = $comments;
                $i++;
            }
            // getting likes 
            $i = 0;
            foreach ($forecasts as $item){
                $likes = DB::table('forecast_votes')
                ->select('*')
                ->where('forecast_id', $item->ForecastId)
                ->where('type', '1')
                ->count('*');

                empty($likes) ? $likes = 0 : $likes=$likes;

                $dislikes = DB::table('forecast_votes')
                ->select('*')
                ->where('forecast_id', $item->ForecastId)
                ->where('type', '2')
                ->count('*');
                empty($dislikes) ? $dislikes = 0 : $dislikes=$dislikes;

                $forecasts[$i]->Rating = $likes- $dislikes;
                $i++;
            }
            // getting favs
            $i = 0;
            foreach ($forecasts as $item){
                $likes = DB::table('forecast_favorites')
                ->select('*')
                ->where('forecast_id', $item->ForecastId)
                ->count('*');
                $forecasts[$i]->FavAmmount = $likes;
                $i++;
            }
        
            // calculating small stat
        
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

            // getting comments quanity
            $i = 0;
            foreach ($forecasts as $item){
                $comments = DB::table('forecast_comments')
                ->select('*')
                ->where('forecast_id', $item->ForecastId)
                ->get();
                empty($comments) ? 0 : $comments;
                $forecasts[$i]->Comments = $comments;
                $i++;
            }

            // getting likes 
            $i = 0;
            foreach ($forecasts as $item){
                $likes = DB::table('forecast_votes')
                ->select('*')
                ->where('forecast_id', $item->ForecastId)
                ->where('type', '1')
                ->count('*');

                empty($likes) ? $likes = 0 : $likes=$likes;

                $dislikes = DB::table('forecast_votes')
                ->select('*')
                ->where('forecast_id', $item->ForecastId)
                ->where('type', '2')
                ->count('*');
                empty($dislikes) ? $dislikes = 0 : $dislikes=$dislikes;

                $forecasts[$i]->Rating = $likes- $dislikes;
                $i++;
            }
              // getting favs
              $i = 0;
              foreach ($forecasts as $item){
                  $likes = DB::table('forecast_favorites')
                  ->select('*')
                  ->where('forecast_id', $item->ForecastId)
                  ->count('*');
                  $forecasts[$i]->FavAmmount = $likes;
                  $i++;
              }

        return $forecasts;
        
    }


    public function like(LikeForecastRequest $request) {
        $hasVotes = DB::table('forecast_votes')
        ->where('user_id', auth('api')->user()->id)
        ->where('forecast_id', $request->forecastId)
        ->count('*');

        if ($hasVotes == 0) {
            DB::table('forecast_votes')
            ->insert([
                'forecast_id' => $request->forecastId,
                'type' => $request->type,
                'user_id' => auth('api')->user()->id
            ]);
            return ['ОПА + голос', 'PS: В разработке нормальные ответы и коды)'];
        } else return ['ТЫ ГАЛАСАВАЛ УЖЕ ЫААААААААА', 'PS: В разработке нормальные ответы и коды)'];
    }

    public function makeFav(AddToFavRequest $request) {
        $hasVotes = DB::table('forecast_favorites')
        ->where('user_id', auth('api')->user()->id)
        ->where('forecast_id', $request->forecastId)
        ->count('*');

        if ($hasVotes == 0) {
            DB::table('forecast_favorites')
            ->insert([
                'forecast_id' => $request->forecastId,
                'user_id' => auth('api')->user()->id
            ]);
            return ['ОПА + фаворит', 'PS: В разработке нормальные ответы и коды)'];
        } else return ['ТЫ УЖЕ ДОБАВИЛ ЫААААААААА', 'PS: В разработке нормальные ответы и коды)'];
    }

    public function comment(CommentForecastReques $request) {
        DB::table('forecast_comments')
        ->insert([
            'forecast_id' => $request->forecastId,
            'comment' => $request->text,
            'replying' => $request->replying,
            'user_id' => auth('api')->user()->id
        ]);
        return ['ОПА + Коммент', 'PS: В разработке нормальные ответы и коды)'];
    }

}
