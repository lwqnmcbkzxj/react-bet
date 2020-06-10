<?php

namespace App\Http\Controllers\Admin;

use App\Coefficient;
use App\Event;
use App\Forecast;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ForecastController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return  json_encode([
            'forecasts' => Forecast::orderBy('created_at', 'DESC')->paginate(10)
        ]);
    }

    public function search(Request $request) {
        if ($request->has('s')) {
            $events = Event::select('id')->where('title', 'LIKE', '%'.$request->get('s').'%')->get();
            $event_ids = [];
            foreach ($events as $event) {
                $event_ids[] = $event->id;
            }
            $forecasts = Forecast::whereIn('event_id', $event_ids);


            return  json_encode([
                'forecasts' => $forecasts->paginate(10)
            ]);
        }
        else {
            return $this->sendError('Неправильный запрос', 401);
        }
    }

    public function userForecasts(Request $request, User $user) {
        $forecasts = Forecast::where('user_id', $user->id)->paginate(10 );

        return  json_encode([
            'forecasts' => $forecasts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return json_encode([
            'forecast' => [],
            'events' => Event::all(),
            'users' => User::all()
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
        if (!Coefficient::where('event_id', $request->get('event_id'))
            ->where('type', $request->get('type'))
            ->exists()
        )
        {
            $coefficient = Coefficient::create($request->only(['event_id', 'type', 'coefficient', 'status']));
        }
        else {
            $coefficient = Coefficient::where('event_id', $request->get('event_id'))
                ->where('type', $request->get('type'))
                ->first();
            $coefficient->update($request->only(['event_id', 'type', 'coefficient', 'status']));
        }
        $request['coefficient_id'] = $coefficient->id;
        $forecast = Forecast::create($request->except(['status', 'type', 'coefficient']));
        return $this->sendResponse($forecast,'Success',200);
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
    public function edit(Forecast $forecast)
    {
        return view('admin.forecasts.edit', [
            'forecast' => $forecast,
            'events' => Event::all(),
            'users' => User::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Forecast $forecast)
    {
        $forecast->update($request->except(['status', 'type', 'coefficient']));

        $coefficient = $forecast->coefficient()->first();
        $coefficient->update($request->only(['status', 'type', 'coefficient']));

        return $this->sendResponse($forecast, 'Success',200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Forecast $forecast)
    {
        $forecast->delete();

        return $this->sendResponse('','Успешно удалено',200);
    }
}
