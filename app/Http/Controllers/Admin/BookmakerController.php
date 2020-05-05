<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Bookmaker;

class BookmakerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.bookmakers.index', [
            'bookmakers' => Bookmaker::orderBy('id', 'desc')->paginate(10)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.bookmakers.create', [
            'bookmaker' => []
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
        if ($request->has('meta_noindex')) {
            $bookmaker = Bookmaker::create($request->except('meta_noindex'));
            $bookmaker->update([
                'meta_noindex' => 1
            ]);
        }
        else {
            $bookmaker = Bookmaker::create($request->all());
            $bookmaker->update([
                'meta_noindex' => 0
            ]);
        }



        if($file=$request->file('image')){
            $name=time() . '-' . $file->getClientOriginalName();
            $file->move(public_path('storage/bookmakers/'.$bookmaker->id), $name);
            $image= '/storage/bookmakers/' . $bookmaker->id . '/' . $name;
            $bookmaker->update(['image' => $image]);
        }

        return redirect()->route('admin.bookmakers.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Bookmaker $bookmaker)
    {
        return view('single-bookmaker', [
            'bookmaker' => $bookmaker
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Bookmaker $bookmaker)
    {
        return view('admin.bookmakers.edit', [
            'bookmaker' => $bookmaker,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Bookmaker $bookmaker)
    {
        if ($request->has('meta_noindex')) {
            $bookmaker->update($request->except('meta_noindex'));
            $bookmaker->update([
                'meta_noindex' => 1
            ]);
        }
        else {
            $bookmaker->update($request->all());
            $bookmaker->update([
                'meta_noindex' => 0
            ]);
        }


        if($file=$request->file('image')){
            $name=time() . '-' . $file->getClientOriginalName();
            $file->move(public_path('storage/bookmakers/'.$bookmaker->id), $name);
            $image= '/storage/bookmakers/' . $bookmaker->id . '/' . $name;
            $bookmaker->update(['image' => $image]);
        }

        return redirect()->route('admin.bookmakers.edit', $bookmaker);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Bookmaker $bookmaker)
    {
        $bookmaker->delete();

        return redirect()->route('admin.bookmakers.index');
    }
}
