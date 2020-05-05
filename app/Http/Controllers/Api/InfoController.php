<?php

namespace App\Http\Controllers\Api;

use App\Forecast;
use App\News;
use App\Post;
use Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;

class InfoController extends Controller
{
    public function forecasts(Request $request) {
        $date = new \DateTime(null, new \DateTimeZone('Europe/Moscow'));

        $forecasts = Forecast::leftJoin('events', 'forecasts.event_id', '=', 'events.id')
            ->with('user')
            ->where('start', '>=', $date->format('Y-m-d H:i:s'))
            ->where('status', 1);

        if ($request->has('kind_sport') && $request['kind_sport'] !== 'all') {
            $forecasts = $forecasts->where('kind_sport', $request['kind_sport']);
        }

        if ($request->has('time') && $request['time'] !== 'all') {
            $filter_date = $date->modify('+' . $request['time'] . ' hours');
            $forecasts = $forecasts->where('start', '<=', $filter_date);
        }

        if ($request->has('subscriptions') && $request['subscriptions'] !== 'false' ) {
            $auth_user = $request->get('user_id');
            $ids = [];
            foreach ($auth_user->subscriptions()->get() as $subscriptions) {
                $ids[] = $subscriptions->id;
            }
            $forecasts = $forecasts->whereIn('user_id', $ids);
        }


        $forecasts = $forecasts->get();

        return json_encode($forecasts);
    }

    public function topForecasters() {
        // Get 9 users who have more than 10 forecasts
        $query = "SELECT DISTINCT users.*, 
                (SELECT SUM(forecasts.bet * forecasts.coefficient) - SUM(forecasts.bet) FROM forecasts, events where users.id = forecasts.user_id AND events.id = forecasts.event_id AND events.status = 2 AND users.role_id = 2) / SUM(forecasts.bet) as roi
                FROM users, forecasts, events
                WHERE users.id = forecasts.user_id
                AND events.id = forecasts.event_id
                AND users.role_id = 2
                AND 10 <= (SELECT COUNT(forecasts.id) FROM forecasts WHERE users.id = forecasts.user_id)
                GROUP BY users.id
                ORDER BY roi DESC
                LIMIT 9";

        return json_encode(DB::select($query));
    }

    public function ratingForecasters(Request $request) {
        if ($request['time'] === 'month') {
            $date = new \DateTime(null, new \DateTimeZone('Europe/Moscow'));
            $date->modify('-1 month');

            // Get all users with information by last month
            $query = "SELECT DISTINCT users.*, 
                (SELECT SUM(forecasts.bet * forecasts.coefficient) - SUM(forecasts.bet) 
                            FROM forecasts, events 
                            WHERE users.id = forecasts.user_id 
                                AND events.id = forecasts.event_id 
                                AND events.status = 2 AND users.role_id = 2 
                                AND events.created_at > '".$date->format('Y-m-d H:i:s')."') 
                        / 
                        (SELECT SUM(forecasts.bet) 
                                FROM forecasts, events 
                                WHERE users.id = forecasts.user_id 
                                  AND events.created_at > '".$date->format('Y-m-d H:i:s')."') 
                    as roi,
                (SELECT COUNT(forecasts.id) FROM forecasts, events WHERE  users.id = forecasts.user_id AND events.id = forecasts.event_id AND events.created_at > '".$date->format('Y-m-d H:i:s')."') AS `count_forecasts`,
                (SELECT COUNT(events.id) FROM events, forecasts WHERE users.id = forecasts.user_id AND events.id = forecasts.event_id AND events.status = 2 AND events.created_at > '".$date->format('Y-m-d H:i:s')."') as `count_win`,
                (SELECT COUNT(events.id) FROM events, forecasts WHERE users.id = forecasts.user_id AND events.id = forecasts.event_id AND events.status = 3 AND events.created_at > '".$date->format('Y-m-d H:i:s')."') as `count_lose`,
                (SELECT COUNT(events.id) FROM events, forecasts WHERE users.id = forecasts.user_id AND events.id = forecasts.event_id AND events.status = 0 AND events.created_at > '".$date->format('Y-m-d H:i:s')."') as `count_back`,
                (SELECT COUNT(events.id) FROM events, forecasts WHERE users.id = forecasts.user_id AND events.id = forecasts.event_id AND events.status = 1 AND events.created_at > '".$date->format('Y-m-d H:i:s')."') as `count_wait`
                FROM users, forecasts, events
                WHERE users.id = forecasts.user_id
                AND events.id = forecasts.event_id
                AND users.role_id = 2
                GROUP BY users.id
                ORDER BY roi DESC";

            return json_encode(DB::select($query));
        }

        else {
            // Get all users with information
            $query = "SELECT DISTINCT users.*, 
                (SELECT SUM(forecasts.bet * forecasts.coefficient) - SUM(forecasts.bet) FROM forecasts, events where users.id = forecasts.user_id AND events.id = forecasts.event_id AND events.status = 2 AND users.role_id = 2) / SUM(forecasts.bet) as roi,
                COUNT(forecasts.id) AS `count_forecasts`,
                (SELECT COUNT(events.id) FROM events, forecasts WHERE users.id = forecasts.user_id AND events.id = forecasts.event_id AND events.status = 2) as `count_win`,
                (SELECT COUNT(events.id) FROM events, forecasts WHERE users.id = forecasts.user_id AND events.id = forecasts.event_id AND events.status = 3) as `count_lose`,
                (SELECT COUNT(events.id) FROM events, forecasts WHERE users.id = forecasts.user_id AND events.id = forecasts.event_id AND events.status = 0) as `count_back`,
                (SELECT COUNT(events.id) FROM events, forecasts WHERE users.id = forecasts.user_id AND events.id = forecasts.event_id AND events.status = 1) as `count_wait`
                FROM users, forecasts, events
                WHERE users.id = forecasts.user_id
                AND events.id = forecasts.event_id
                AND users.role_id = 2
                GROUP BY users.id
                ORDER BY roi DESC";

            return json_encode(DB::select($query));
        }
    }

    public function userStatistic(Request $request) {
        if ($request->has('user_id')) {
            $user = User::where('id', $request->get('user_id'))->first();
            $user->roi = $user->roi($user->id);
            $user->pure_profit = $user->pureProfit($user->id);
            $user->stats = $user->stats($user->id);
            $user->rating_position = $user->ratingPosition($user->id);
            $user->subscribers_count = $user->subscribers()->count();

            return json_encode($user);
        }
    }

    public function userForecasts(Request $request) {
        if ($request->has('user_id')) {
            $user = User::where('id', $request->get('user_id'))->first();
            $forecasts = $user->forecasts()->leftJoin('events', 'forecasts.event_id', '=', 'events.id')->get();
            return json_encode($forecasts);
        }
    }

    public function posts() {
        return json_decode(Post::orderBy('created_at', 'DESC')->get());
    }

    public function post(Request $request, $id) {
        return json_decode(Post::where('id', $id)->first());
    }

    public function news() {
        return json_decode(News::orderBy('created_at', 'DESC')->get());
    }
}
