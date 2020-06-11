<?php

namespace App\Http\Controllers;

use App\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
class BannerController extends Controller
{
    function getActive(Request $request)
    {
        $res = Banner::query()->where('status','=',1);
        if($request->has('search')&&$request->has('search_by') && ($request['search']!='' && $request['search_by']!=''))
        {
            $res = $res->where($request->search_by, 'LIKE', "%" . $request->search . "%");
        }
        if (!$request->has('order_by')) {
            $request['order_by'] = 'id';
        }
        if (!$request->has('limit')) {
            $request['limit'] = 16;
        }
        return $this->sendResponse($res->orderBy($request['order_by'], 'desc')->paginate($request['limit']),'Success',200);
    }

    function get(Request $request,  $banner)
    {
        return $this->sendResponse($banner,'Success',200);
    }

    function delete(Request $request, Banner $banner)
    {
        $banner->delete();
        return $this->sendResponse("", "Success deleted", 200);
    }

    function getAll(Request $request)
    {
        $res = Banner::query();
        if($request->has('search')&&$request->has('search_by') && ($request['search']!='' && $request['search_by']!=''))
        {
            $res = $res->where($request->search_by, 'LIKE', "%" . $request->search . "%");
        }
        if (!$request->has('order_by')) {
            $request['order_by'] = 'id';
        }
        if (!$request->has('limit')) {
            $request['limit'] = 16;
        }
        return $this->sendResponse($res->orderBy($request['order_by'], 'desc')->paginate($request['limit']),'Success',200);
    }

    function edit(Request $request, Banner $banner)
    {
        $banner->update($request->except('image'));
        if ($file = $request->file('image')) {
            $name = time() . '-' . uniqid() .'.'. $file->getClientOriginalExtension();;

            $file->move(public_path('storage/banners/' . $banner->id), $name);
            $image = '/storage/banners/'.$banner->id.'/'.$name;
            $banner->update(['image' => $image]);
        }
        return $banner;
    }

    function post(Request $request)
    {
        $banner= Banner::create($request->except('image'));
        if ($file = $request->file('image')) {
            $name = time() . '-' . uniqid() .'.'. $file->getClientOriginalExtension();;
            $file->move(public_path('storage/banners/' . $banner->id), $name);
            $image = '/storage/banners/'.$banner->id.'/'.$name;
            $banner->update(['image' => $image]);
        }
        return $banner;
    }

}
