<?php

namespace App\Http\Controllers\Admin;

use App\Championship;
use App\Sport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ChampionshipController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.championships.index', [
            'championships' => Championship::orderBy('created_at', 'DESC')->paginate(10)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.championships.create', [
            'championship' => [],
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
        $championship = Championship::create($request->all());

        return redirect()->route('admin.championship.edit', $championship);
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
    public function edit(Championship $championship)
    {
        return view('admin.championships.edit', [
            'championship' => $championship,
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
    public function update(Request $request, Championship $championship)
    {
        $championship->update($request->all());

        return redirect()->route('admin.championships.edit', $championship);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Championship $championship)
    {
        $championship->delete();

        return redirect()->route('admin.championships.index');
    }
}
