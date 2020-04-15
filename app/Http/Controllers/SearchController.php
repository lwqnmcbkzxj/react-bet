<?php

namespace App\Http\Controllers;

use App\Forecast;
use App\News;
use App\Post;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function Search(Request $request) {
        // Определим сообщение, которое будет отображаться, если ничего не найдено
        // или поисковая строка пуста

        $error = 'Ничего не найдено, попробуйте еще раз с разными ключевыми словами.';
        if ($request->has('s')) {
            $posts = Post::search($request->get('s'))->get();

            if ($posts->count()) {
                return view('search', [
                    'posts' => $posts
                ]);
            }
            else {
                return view('search', [
                    'posts' => [],
                    'error' => $error
                ]);
            }
        }
        else {
            return view('search', [
                'posts' => [],
                'error' => $error
            ]);
        }
    }
}
