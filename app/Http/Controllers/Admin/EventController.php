<?php

namespace App\Http\Controllers\Admin;

use App\Championship;
use App\Event;
use App\Sport;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EventController extends Controller
{

    public function getAll(Request $request)
    {
        if (!$request->has('order_by')) {
            $request['order_by'] = 'id';
        }
        if (!$request->has('limit')) {
            $request['limit'] = 15;
        }
        if (!$request->has('direction')) {
            $request['direction'] = 'desc';
        }
        $res = Event::query()->with('sport')->orderBy($request['order_by'], $request['direction']);
        if($request->has('search')&&($request['search']!=''))
        {
            $res = $res->where('title', 'LIKE', "%" . $request->search . "%");
        }
        return $this->sendResponse($res->paginate($request['limit']),'Success',200);
    }

    public function post(Request $request)
    {
        $event = Event::create($request->all());
        return $this->sendResponse($event,'Success',200);
    }

    public function get(Event $event)
    {
        return $this->sendResponse($event->load('sport'), 'Success',200);
    }

    public function edit(Request $request, Event $event)
    {
        $event->update($request->all());
        return $this->sendResponse($event,'Success',200);
    }

    public function delete(Event $event)
    {
        $event->delete();
        return $this->sendResponse('','Success',200);
    }
}
