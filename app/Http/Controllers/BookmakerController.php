<?php

namespace App\Http\Controllers;

use App\Bookmaker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookmakerController extends Controller
{
    function getAll(Request $request)
    {
        if (!$request->has('order_by')) {
            $request['order_by'] = 'id';
        }
        if (!$request->has('limit')) {
            $request['limit'] = 15;
        }
        return $this->sendResponse(Bookmaker::query()->orderBy($request['order_by'])->paginate($request['limit']),'Success',200);
    }

    function get(Request $request, Bookmaker $bookmaker)
    {
        return $this->sendResponse($bookmaker,'Success',200);
    }

    function delete(Request $request, Bookmaker $bookmaker)
    {
        $bookmaker->delete();
        return $this->sendResponse("", "Success deleted", 200);
    }

    function search(Request $request)
    {
        if (!$request->has('order_by')) {
            $request['order_by'] = 'id';
        }
        if (!$request->has('limit')) {
            $request['limit'] = 15;
        }
        return $this->sendResponse(Bookmaker::query()->where($request->search_by, 'LIKE', "%" . $request->search . "%")->orderBy($request['order_by'])->paginate($request['limit']),'Success',200);
    }

    function edit(Request $request, Bookmaker $bookmaker)
    {
        $bookmaker->update($request->except('logo'));
        if ($file = $request->file('logo')) {
            $name = time() . '-' . uniqid();
            $file->move(public_path('storage/bookmakers/' . $bookmaker->id), $name);
            $image = '/storage/bookmakers/'.$name;
            $bookmaker->update(['logo' => $image]);
        }
        return $this->sendResponse($bookmaker,'Success', 200);
    }

    function post(Request $request)
    {
        $bookmaker= Bookmaker::create($request->except('logo'));
        if ($file = $request->file('logo')) {
            $name = time() . '-' . uniqid();
            $file->move(public_path('storage/bookmakers/' . $bookmaker->id), $name);
            $image = '/storage/bookmakers/'.$name;
            $bookmaker->update(['logo' => $image]);
        }
        return $this->sendResponse($bookmaker, 'Success',200);
    }
}
