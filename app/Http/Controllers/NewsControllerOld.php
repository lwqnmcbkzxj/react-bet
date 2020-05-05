<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\GetAllNewsRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NewsControllerOld extends Controller
{
    public function get(GetAllNewsRequest $request)
    {
        $page = (int) $request->get('page', 0);
        $quantity = (int) $request->get('quantity', 100);
        $MAX_DESCRIPTION_SIZE = (int) $request->get('content-size', 100);
        $news = DB::table('news')->select(['id', 'title', DB::raw("concat(substring(`content`, 1, ${MAX_DESCRIPTION_SIZE}),'...') as 'content'"), 'link'])
                            ->orderBy('news.updated_at')
                            ->offset($page*$quantity)
                            ->limit($quantity)
                            ->get();
        $num =  DB::table('news')->count('id');
        return $news->jsonSerialize();
    }
    public function detail(int $id)
    {
        $news = DB::table('news')->select(['id', 'title', 'content', 'link'])->where('id', '=', $id)->get();
        return $news->jsonSerialize();
    }

}
