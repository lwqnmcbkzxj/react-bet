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
            $request['limit'] = 'limit';
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
            $request['limit'] = 'limit';
        }
        return $this->sendResponse(Bookmaker::query()->where($request->search_by, 'LIKE', "%" . $request->search . "%")->orderBy($request['order_by'])->paginate($request['limit']),'Success',200);
    }

    function edit(Request $request, Bookmaker $bookmaker)
    {
        $bookmaker->title = $request['title'];
        $bookmaker->content = $request['content'];
        $bookmaker->rating = $request['rating'];
        $bookmaker->bonus = $request['bonus'];
        $bookmaker->logo = $request['logo'];
        $bookmaker->link = $request['link'];
        $bookmaker->save();
        return $this->sendResponse($bookmaker,'Success', 200);
    }

    function post(Request $request)
    {
        $bookmaker = new Bookmaker();
        $bookmaker->title = $request['title'];
        $bookmaker->content = $request['content'];
        $bookmaker->rating = $request['rating'];
        $bookmaker->bonus = $request['bonus'];
        $bookmaker->logo = $request['logo'];
        $bookmaker->link = $request['link'];
        $bookmaker->save();
        return $this->sendResponse($bookmaker, 'Success',200);
    }
}
