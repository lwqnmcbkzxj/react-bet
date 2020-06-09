<?php

namespace App\Http\Controllers\Admin;

use App\Exports\BookmakersExport;
use App\Exports\ForecastsExport;
use App\Exports\PostsExport;
use App\Forecast;
use App\News;
use App\Post;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\UsersExport;

class DashboardController extends Controller
{
    public function index() {

        return $this->sendResponse([
            'users_count' => User::where('role_id', 1)->count(),
            'forecasts_count' => Forecast::count(),
            'posts_count' => Post::count(),
            'news_count' => News::count(),
            'users_count_today' => User::where('role_id', 1)->where('created_at', '>=', now()->format('Y-m-d'))->count(),
            'forecasts_count_today' => Forecast::where('created_at', '>=', now()->format('Y-m-d'))->count(),
            'posts_count_today' => Forecast::where('created_at', '>=', now()->format('Y-m-d'))->count(),
            'news_count_today' => Forecast::where('created_at', '>=', now()->format('Y-m-d'))->count(),
        ],'Success',200);
    }
    public function exportUsers() {
        return Excel::download(new UsersExport, 'users.xlsx');
    }
    public function exportForecasts() {
        return Excel::download(new ForecastsExport, 'forecasts.xlsx');
    }
    public function exportPosts() {
        return Excel::download(new PostsExport, 'posts.xlsx');
    }
    public function exportBookmakers() {
        return Excel::download(new BookmakersExport, 'bookmakers.xlsx');
    }
}
