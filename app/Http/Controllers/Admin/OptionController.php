<?php

namespace App\Http\Controllers\Admin;

use App\Option;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OptionController extends Controller
{
    public function index() {
        return view('admin.options.index', [
            'options' => Option::all()
        ]);
    }

    public function update(Request $request) {
        $option = Option::where('key', 'hide_forecast_message')->first();
        $option->update([
            'value' => null
        ]);
        foreach ($request->keys() as $key) {
            if (Option::where('key', $key)->exists()) {
                $option = Option::where('key', $key)->first();
                $option->update([
                    'value' => $request->get($key)
                ]);
            }
        }

        if($file=$request->file('favicon')){
            $name=time() . '-' . $file->getClientOriginalName();
            $file->move(public_path('storage/favicon/'), $name);
            $image= '/storage/favicon/' . $name;
            $option = Option::where('key', 'favicon')->first();
            $option->update(['value' => $image]);
        }

        return redirect()->route('admin.options');
    }
}
