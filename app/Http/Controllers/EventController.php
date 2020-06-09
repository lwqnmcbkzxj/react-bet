<?php
namespace App\Http\Controllers;

use App\Event;
use App\Http\Resources\EventProfile;
use App\Http\Resources\ForecastCollection;
use App\Forecast;
use DateTime;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\EventCollection;
use Illuminate\Support\Facades\DB;
use function GuzzleHttp\describe_type;

class EventController extends Controller
{
    public function getAll(Request $request)
    {
        $date = new DateTime('now', new \DateTimeZone('Europe/Moscow'));
        $events = Event::query()->leftJoin(DB::raw(" (SELECT
        `event_id`, COUNT(`event_id`) as forecasts_count
    FROM
        api_betting_hub.forecasts
    GROUP BY `event_id`) as T"),'event_id','=','id');;
        if (!$request->has('limit') || $request['limit'] == 0) {
            $request['limit'] = 15;
        }
        if ($request->has('order_by')) {
            $events = $events->orderBy($request['order_by'], $request['direction'] ? $request['direction'] : 'DESC');
        }
        else
            $events = $events->orderBy('forecasts_count','desc');
        $events = $events->paginate($request['limit']);
        $events = new EventCollection($events);
        return $this->sendResponse(($events), 'Success', 200);
    }
    public function get(Event $event)
    {
        return $this->sendResponse(new EventProfile($event), 'Success', 200);
    }
}
