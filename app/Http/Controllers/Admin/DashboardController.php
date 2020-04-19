<?php

namespace App\Http\Controllers\Admin;

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
        $date = new \DateTime(null, new \DateTimeZone('Europe/Moscow'));

        return view('admin.index', [
            'users_count' => User::where('role_id', 1)->count(),
            'forecasts_count' => Forecast::count(),
            'posts_count' => Post::count(),
            'news_count' => News::count(),
            'users_count_today' => User::where('role_id', 1)->where('created_at', '>=', $date->format('Y-m-d'))->count(),
            'forecasts_count_today' => Forecast::where('created_at', '>=', $date->format('Y-m-d'))->count(),
            'posts_count_today' => Post::where('created_at', '>=', $date->format('Y-m-d'))->count(),
            'news_count_today' => News::where('created_at', '>=', $date->format('Y-m-d'))->count()
        ]);
    }

    public function exportUsers() {
        return Excel::download(new UsersExport, 'users.xlsx');
    }
}