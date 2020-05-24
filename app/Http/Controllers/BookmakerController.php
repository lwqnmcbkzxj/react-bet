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
        return Bookmaker::query()->orderBy($request['order_by'])->paginate($request['limit']);
    }

    function get(Request $request, Bookmaker $bookmaker)
    {
        return $bookmaker;
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
        return Bookmaker::query()->where($request->search_by, 'LIKE', "%" . $request->search . "%")->orderBy($request['order_by'])->paginate($request['limit']);
    }

    function edit(Request $request, Bookmaker $bookmaker)
    {
        $bookmaker->title->$request['title'];
        $bookmaker->content->$request['content'];
        $bookmaker->rating->$request['rating'];
        $bookmaker->bonus->$request['bonus'];
        $bookmaker->logo->$request['logo'];
        $bookmaker->link->$request['link'];
        $bookmaker->save();
        return $bookmaker;
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
        return $bookmaker;
    }
}
