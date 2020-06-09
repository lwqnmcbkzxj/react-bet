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
use function GuzzleHttp\describe_type;

class EventController extends Controller
{
    public function getAll(Request $request)
    {
        $date = new DateTime('now', new \DateTimeZone('Europe/Moscow'));
        $events = Event::query();
        if (!$request->has('limit') || $request['limit'] == 0) {
            $request['limit'] = 6;
        }
        if ($request->has('order_by')) {
            $events = $events->orderBy($request['order_by'], $request['direction']?$request['direction']:'DESC');
        }
        $events = $events->orderBy('id', 'desc')->paginate($request['limit']);
        $events = new EventCollection($events);
        return $this->sendResponse(($events), 'Success', 200);
    }
    public function get(Event $event)
    {
        return $this->sendResponse(new EventProfile($event), 'Success', 200);
    }
}
