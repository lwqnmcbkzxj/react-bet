<?php

namespace App\Http\Controllers\Admin;

use App\Championship;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ChampionshipController extends Controller
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
        $res = Championship::query()->orderBy($request['order_by'], $request['direction']);
        if($request->has('search')&&($request['search']!=''))
        {
            $res = $res->where('name', 'LIKE', "%" . $request->search . "%");
        }
        return $this->sendResponse($res->paginate($request['limit']),'Success',200);
    }

    public function post(Request $request)
    {
        $championship = Championship::create($request->all());
        return $this->sendResponse($championship,'Success',200);
    }

    public function get(Championship $championship)
    {
        return $this->sendResponse($championship, 'Success',200);
    }

    public function edit(Request $request, Championship $championship)
    {
        $championship->update($request->all());
        return $this->sendResponse($championship,'Success',200);
    }

    public function delete(Championship $championship)
    {
        $championship->delete();
        return $this->sendResponse('','Success',200);
    }
}
