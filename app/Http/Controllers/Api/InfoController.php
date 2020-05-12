<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\ForecastCollection;
use App\Http\Resources\User as UserResource;
use App\Http\Resources\Forecast as ForecastResource;
use App\Forecast;
use App\Http\Resources\UserCollection;
use App\News;
use App\Post;
use DateTime;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\DB;

class InfoController extends Controller
{
    public function forecasts(Request $request)
    {
        $date = new DateTime('now', new \DateTimeZone('Europe/Moscow'));
        $forecasts = Forecast::query()->whereHas('event', function (Builder $query) use ($date, $request) {
            $query//->where('start', '>=', $date->format('Y-m-d H:i:s'))
            ->where('status', '=', 1);
            if ($request->has('time') && $request['time'] != '0') {
                $filter_date = $date->modify('+' . $request['time'] . ' hours');
                $query->where('start', '<=', $filter_date);
            }
            if ($request->has('sport_id') && $request['sport_id'] != 0) {
                $query->where('sport_id', '=', $request['sport_id']);
            }
        });

        if (!$request->has('limit') || $request['limit'] == 0) {
            $request['limit'] = 6;
        }

        $forecasts = $forecasts->paginate($request['limit']);
        $forecasts = new ForecastCollection($forecasts);
        return $this->sendResponse(($forecasts), 'Success', 200);

    }

    public function forecast(Forecast $forecast)
    {

        return $this->sendResponse(new ForecastResource($forecast), 'Success', 200);

    }

    public function forecasters(Request $request)
    {

        if (!$request->has('limit') || $request['limit'] == 0) {
            $request['limit'] = 15;
        }
        if (true or !$request->has('order_by')) {
            $request['order_by'] = 'roi';
        }
        if (!$request->has('direction')) {
            $request['direction'] = 'desc';
        }
        $response = User::query()->join('user_stats_view', 'user_id', '=', 'id')->orderBy($request['order_by'],$request['direction']);

        return (new UserCollection($response->paginate( $request['limit'])));
    }

    public function forecaster(Request $request, User $user)
    {
        return $this->sendResponse(new UserResource($user), 'Success', 200);
    }

    public function topForecasters()
    {
        // Get 9 users who have more than 10 forecasts
        $query = "SELECT DISTINCT users.*,
                (SELECT SUM(forecasts.bet * coefficients.coefficient) - SUM(forecasts.bet) FROM forecasts, events where users.id = forecasts.user_id AND events.id = forecasts.event_id AND events.status = 2 AND users.role_id = 2) / SUM(forecasts.bet) as roi
                FROM users, (forecasts LEFT JOIN coefficients ON forecasts.coefficient_id = coefficients.id), events
                WHERE users.id = forecasts.user_id
                AND events.id = forecasts.event_id
                AND users.role_id = 2
                AND 10 <= (SELECT COUNT(forecasts.id) FROM forecasts WHERE users.id = forecasts.user_id)
                GROUP BY users.id
                ORDER BY roi DESC
                LIMIT 9";

        return json_encode(DB::select($query));
    }

    public function ratingForecasters(Request $request)
    {
        if ($request['time'] === 'month') {
            $date = new \DateTime(null, new \DateTimeZone('Europe/Moscow'));
            $date->modify('-1 month');

            // Get all users with information by last month
            $query = "SELECT DISTINCT users.*,
                (SELECT SUM(forecasts.bet * coefficients.coefficient) - SUM(forecasts.bet)
                            FROM (forecasts LEFT JOIN coefficients ON forecasts.coefficient_id = coefficients.id), events
                            WHERE users.id = forecasts.user_id
                                AND events.id = forecasts.event_id
                                AND events.status = 2 AND users.role_id = 2
                                AND events.created_at > '" . $date->format('Y-m-d H:i:s') . "')
                        /
                        (SELECT SUM(forecasts.bet)
                                FROM forecasts, events
                                WHERE users.id = forecasts.user_id
                                  AND events.created_at > '" . $date->format('Y-m-d H:i:s') . "')
                    as roi,
                (SELECT COUNT(forecasts.id) FROM forecasts, events WHERE  users.id = forecasts.user_id AND events.id = forecasts.event_id AND events.created_at > '" . $date->format('Y-m-d H:i:s') . "') AS `count_forecasts`,
                (SELECT COUNT(events.id) FROM events, forecasts WHERE users.id = forecasts.user_id AND events.id = forecasts.event_id AND events.status = 2 AND events.created_at > '" . $date->format('Y-m-d H:i:s') . "') as `count_win`,
                (SELECT COUNT(events.id) FROM events, forecasts WHERE users.id = forecasts.user_id AND events.id = forecasts.event_id AND events.status = 3 AND events.created_at > '" . $date->format('Y-m-d H:i:s') . "') as `count_lose`,
                (SELECT COUNT(events.id) FROM events, forecasts WHERE users.id = forecasts.user_id AND events.id = forecasts.event_id AND events.status = 0 AND events.created_at > '" . $date->format('Y-m-d H:i:s') . "') as `count_back`,
                (SELECT COUNT(events.id) FROM events, forecasts WHERE users.id = forecasts.user_id AND events.id = forecasts.event_id AND events.status = 1 AND events.created_at > '" . $date->format('Y-m-d H:i:s') . "') as `count_wait`
                FROM users, forecasts, events
                WHERE users.id = forecasts.user_id
                AND events.id = forecasts.event_id
                AND users.role_id = 2
                GROUP BY users.id
                ORDER BY roi DESC";

            return $this->sendResponse(DB::select($query), 'Success', 200);
        } else {
            // Get all users with information
            $query = "SELECT DISTINCT users.*,
                (SELECT SUM(forecasts.bet * coefficients.coefficient) - SUM(forecasts.bet) FROM (forecasts LEFT JOIN coefficients ON forecasts.coefficient_id = coefficients.id), events where users.id = forecasts.user_id AND events.id = forecasts.event_id AND events.status = 2 AND users.role_id = 2) / SUM(forecasts.bet) as roi,
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

            return $this->sendResponse(DB::select($query), 'Success', 200);
        }
    }

    public function userStatistic(User $user)
    {
        $user['stats'] = $user->stats;
        return $this->sendResponse($user, 'Success', 200);;
    }

    public function userForecasts(User $user)
    {
        $forecasts = $user->forecasts()->leftJoin('events', 'forecasts.event_id', '=', 'events.id')->get();
        return $this->sendResponse($forecasts, 'Success', 200);
    }

    public function posts(Request $request)
    {
        if (!$request->has('limit')) {
            $request['limit'] = 15;
        }
        if (!$request->has('order_by')) {
            $request['order_by'] = 'created_at';
        }
        if (!$request->has('direction')) {
            $request['direction'] = 'desc';
        }
        $posts = Post::orderBy($request['order_by'], $request['direction'])->paginate($request['limit']);
        return $this->sendResponse($posts, 'Success', 200);
    }

    public function post(Request $request, $id)
    {
        return json_decode(Post::where('id', $id)->first());
    }

    public function news(Request $request)
    {
        if (!$request->has('limit')) {
            $request['limit'] = 15;
        }
        if (!$request->has('order_by')) {
            $request['order_by'] = 'created_at';
        }
        if (!$request->has('direction')) {
            $request['direction'] = 'desc';
        }
        $posts = News::orderBy($request['order_by'], $request['direction'])->paginate($request['limit']);
        return $this->sendResponse($posts, 'Success', 200);
    }

    public function newsOne(News $news)
    {
        return json_decode($news);
    }
}
