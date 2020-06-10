<?php

namespace App\Http\Controllers\Admin;

use Garf\LaravelConf\ConfFacade as Conf;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class OptionController extends Controller
{
    public function index()
    {
        return $this->sendResponse(conf()->all(), 'Success', 200);
    }

    public function update(Request $request)
    {
        /* $option = Option::where('key', 'hide_forecast_message')->first();
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
         }*/
        conf($request->except('favicon'));
        return $this->sendResponse(conf()->all(), 'Success', 200);
    }
}

