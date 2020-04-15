<?php

namespace App\Http\Controllers;

use App\Bookmaker;
use App\Forecast;
use App\News;
use App\Page;
use App\Post;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Auth;

class ShowController extends Controller
{
    public function index() {
        $date = new \DateTime(null, new \DateTimeZone('Europe/Moscow'));

        // Get 9 users who have more than 10 forecasts
        $query = "SELECT DISTINCT users.*, 
                (SELECT SUM(forecasts.bet * coefficients.coefficient) - SUM(forecasts.bet) FROM forecasts, events, coefficients where users.id = forecasts.user_id AND events.id = forecasts.event_id AND events.status = 2 AND users.role_id = 2 AND coefficients.id = forecasts.coefficient_id AND coefficients.status = 2) / SUM(forecasts.bet) as roi
                FROM users, forecasts, events
                WHERE users.id = forecasts.user_id
                AND events.id = forecasts.event_id
                AND users.role_id = 2
                AND 10 <= (SELECT COUNT(forecasts.id) FROM forecasts WHERE users.id = forecasts.user_id)
                GROUP BY users.id
                ORDER BY roi DESC
                LIMIT 9";

        return view('index', [
            'forecasts' => Forecast::leftJoin('events', 'forecasts.event_id', '=', 'events.id')
                ->with('user')
                ->where('start', '>', $date->format('Y-m-d H:i:s'))
                ->where('status', 1)
                ->take(10)
                ->get(),
            'users' => DB::select($query)
        ]);
    }

    public function forecasts(Request $request) {
        $date = new \DateTime(null, new \DateTimeZone('Europe/Moscow'));

        $forecasts = Forecast::leftJoin('events', 'forecasts.event_id', '=', 'events.id')
                        ->with('user')
                        ->where('start', '>=', $date->format('Y-m-d H:i:s'))
                        ->where('status', 1);

        if ($request->has('sport_id') && $request['sport_id'] !== 'all') {
            $forecasts = $forecasts->where('sport_id', $request['sport_id']);
        }

        if ($request->has('time') && $request['time'] !== 'all') {
            $filter_date = $date->modify('+' . $request['time'] . ' hours');
            $forecasts = $forecasts->where('start', '<=', $filter_date);
        }

        if ($request->has('subscriptions') && $request['subscriptions'] !== 'false' ) {
            if (Auth::user()) {
                $auth_user = Auth::user();
                $ids = [];
                foreach ($auth_user->subscriptions()->get() as $subscriptions) {
                    $ids[] = $subscriptions->id;
                }
                $forecasts = $forecasts->whereIn('user_id', $ids);
            }
            else {
                return redirect()->route('page.forecasts')->withErrors(['subscribe' => 'Пожалуйста, авторизуйтесь, для просмотра своих подписок']);
            }
        }


        $forecasts = $forecasts->paginate(12)->appends([
            'kind_sport' => $request['kind_sport'],
            'time' => $request['time']
        ]);

        return view('forecasts', [
            'forecasts' => $forecasts
        ]);
    }

    public function rating(Request $request) {

        if ($request['time'] === 'month') {
            $date = new \DateTime(null, new \DateTimeZone('Europe/Moscow'));
            $date->modify('-1 month');

            // Get all users with information by last month
            $query = "SELECT DISTINCT users.*, 
                ((SELECT IFNULL(SUM(forecasts.bet * coefficients.coefficient), 0) FROM forecasts, events, coefficients where users.id = forecasts.user_id AND events.id = forecasts.event_id AND events.status = 2 AND users.role_id = 2 AND coefficients.id = forecasts.coefficient_id AND coefficients.status = 2 AND forecasts.created_at > '".$date->format('Y-m-d H:i:s')."') - SUM(forecasts.bet) ) / SUM(forecasts.bet) as roi,
                (SELECT COUNT(forecasts.id) FROM forecasts, events WHERE  users.id = forecasts.user_id AND forecasts.created_at > '".$date->format('Y-m-d H:i:s')."') AS `count_forecasts`,
                (SELECT COUNT(coefficients.id) FROM coefficients, forecasts WHERE users.id = forecasts.user_id AND coefficients.id = forecasts.coefficient_id AND coefficients.status = 2 AND forecasts.created_at > '".$date->format('Y-m-d H:i:s')."') as `count_win`,
                (SELECT COUNT(coefficients.id) FROM coefficients, forecasts WHERE users.id = forecasts.user_id AND coefficients.id = forecasts.coefficient_id AND coefficients.status = 3 AND forecasts.created_at > '".$date->format('Y-m-d H:i:s')."') as `count_lose`,
                (SELECT COUNT(coefficients.id) FROM coefficients, forecasts WHERE users.id = forecasts.user_id AND coefficients.id = forecasts.coefficient_id AND coefficients.status = 0 AND forecasts.created_at > '".$date->format('Y-m-d H:i:s')."') as `count_back`,
                (SELECT COUNT(coefficients.id) FROM coefficients, forecasts WHERE users.id = forecasts.user_id AND coefficients.id = forecasts.coefficient_id AND coefficients.status = 1 AND forecasts.created_at > '".$date->format('Y-m-d H:i:s')."') as `count_wait`
                FROM users, forecasts, events
                WHERE users.id = forecasts.user_id
                AND events.id = forecasts.event_id
                AND users.role_id = 2
                GROUP BY users.id
                ORDER BY roi DESC";

            return view('rating', [
                'users' => DB::select($query)
            ]);
        }

        else {
            // Get all users with information
            $query = "SELECT DISTINCT users.*, 
                ((SELECT IFNULL(SUM(forecasts.bet * coefficients.coefficient), 0) FROM forecasts, events, coefficients where users.id = forecasts.user_id AND events.id = forecasts.event_id AND events.status = 2 AND users.role_id = 2 AND coefficients.id = forecasts.coefficient_id AND coefficients.status = 2) - SUM(forecasts.bet) ) / SUM(forecasts.bet) as roi,
                COUNT(forecasts.id) AS `count_forecasts`,
                (SELECT COUNT(coefficients.id) FROM coefficients, forecasts WHERE users.id = forecasts.user_id AND coefficients.id = forecasts.coefficient_id AND coefficients.status = 2) as `count_win`,
                (SELECT COUNT(coefficients.id) FROM coefficients, forecasts WHERE users.id = forecasts.user_id AND coefficients.id = forecasts.coefficient_id AND coefficients.status = 3) as `count_lose`,
                (SELECT COUNT(coefficients.id) FROM coefficients, forecasts WHERE users.id = forecasts.user_id AND coefficients.id = forecasts.coefficient_id AND coefficients.status = 0) as `count_back`,
                (SELECT COUNT(coefficients.id) FROM coefficients, forecasts WHERE users.id = forecasts.user_id AND coefficients.id = forecasts.coefficient_id AND coefficients.status = 1) as `count_wait`
                FROM users, forecasts, events
                WHERE users.id = forecasts.user_id
                AND events.id = forecasts.event_id
                AND users.role_id = 2
                GROUP BY users.id
                ORDER BY roi DESC";

            return view('rating', [
                'users' => DB::select($query)
            ]);
        }
    }

    public function posts() {
        return view('posts', [
            'posts' => Post::where('is_published', true)->orderBy('id', 'desc')->paginate(10)
        ]);
    }

    public function news() {
        return view('news', [
            'news' => News::orderBy('id', 'desc')->paginate(10)
        ]);
    }

    public function about() {
        return view('about', [
            'page' => Page::where('name', 'about')->first()
        ]);
    }

    public function privacy() {
        return view('about', [
            'page' => Page::where('name', 'privacy')->first()
        ]);
    }

    public function feedback() {
        return view('feedback');
    }

    public function bookmakers() {
        return view('bookmakers', [
            'bookmakers' => Bookmaker::all()
        ]);
    }
}
