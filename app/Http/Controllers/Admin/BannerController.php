<?php

namespace App\Http\Controllers\Admin;

use App\Banner;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use function MongoDB\BSON\toJSON;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ['banners' => Banner::orderBy('created_at', 'DESC')->paginate(10)].toJSON();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return ['banner' => []].toJSON();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $banner = Banner::create($request->except('image'));

        if($file=$request->file('image')){
            $name=time() . '-' . $file->getClientOriginalName();
            $file->move(public_path('storage/banners/'.$banner->id), $name);
            $image= '/storage/banners/' . $banner->id . '/' . $name;
            $banner->update(['image' => $image]);
        }

        return $banner->json();
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
    public function edit(Banner $banner)
    {
        return ['banner' => $banner].toJSON();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Banner $banner)
    {
        $banner->update($request->except(['image']));

        if($file=$request->file('image')){
            $name=time() . '-' . $file->getClientOriginalName();
            $file->move(public_path('storage/banners/'.$banner->id), $name);
            $image= '/storage/banners/' . $banner->id . '/' . $name;
            $banner->update(['image' => $image]);
        }

        return ['banner' => $banner].toJSON();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Banner $banner)
    {
        $banner->delete();

        return $this->sendResponse('', 'Успешно удален', 200);
    }
}