<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\File;
class PolicyController extends Controller
{
    public function post(Request $request)
    {
        File::put(storage_path('terms.json'),json_encode(['text'=>$request->text]));
        return  File::get(storage_path('terms.json'));
    }
}
