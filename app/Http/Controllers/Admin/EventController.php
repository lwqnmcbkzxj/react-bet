<?php

namespace App\Http\Controllers\Admin;

use App\Championship;
use App\Event;
use App\Sport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return  json_encode([
            'events' => Event::orderBy('start', 'DESC')->paginate(10)
        ]);
    }

    public function search(Request $request) {
        if ($request->has('s')) {
            $events = Event::where('title', 'LIKE', '%'.$request->get('s').'%');

            return  json_encode([
                'events' => $events->paginate(10)
            ]);
        }
        else {
            return redirect()->route('admin.events.index');
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return json_encode([
            'event' => [],
            'championships' => Championship::all(),
            'sports' => Sport::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $pattern = '/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/';
        if (!preg_match($pattern, $request->get('start'))) {
            return redirect()->route('admin.events.create')->withErrors(['start' => 'Некорректный формат для даты начала матча']);
        }

        $event = Event::create($request->all());

        return  json_encode( $event);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Event $event)
    {
        return  json_encode([
            'event' => $event,
            'championships' => Championship::all(),
            'sports' => Sport::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Event $event)
    {
        $event->update($request->all());

        return redirect()->route('admin.events.edit', $event);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Event $event)
    {
        $event->delete();

        return $this->sendResponse('','Успешно удалено',200);
    }
}
