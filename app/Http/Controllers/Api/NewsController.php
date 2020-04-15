<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\News;

class NewsController extends Controller
{
    public function getNews() {
        $rss = file_get_contents('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnews.yandex.ru%2Fsport.rss');
        $rss = json_decode($rss);
        foreach ($rss->items as $item) {
            if (!News::where('title', $item->title)->exists()) {
                News::create([
                    'title' => $item->title,
                    'content' => $item->description,
                    'link' => $item->link
                ]);
            }
        }
    }
}
