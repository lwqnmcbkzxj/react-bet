<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class ProfileController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('auth.profile.index', [
            'user' => Auth::user()
        ]);
    }

    public function updateLogin(Request $request) {
        $valid_data = $request->validate([
            'login' => 'required|string|max:255|unique:users'
        ]);

        $login = $valid_data['login'];
        $user = Auth::user();

        $user->update([
            'login' => $login
        ]);
        return redirect()->back()->withSuccess([
            'login' => 'Логин успешно обновлен!'
        ]);
    }

    public function updateEmail(Request $request) {
        $valid_data = $request->validate([
            'email' => 'required|string|email|max:255|unique:users'
        ]);

        $email = $valid_data['email'];
        $user = Auth::user();

        $user->update([
            'email' => $email
        ]);
        return redirect()->back()->withSuccess([
            'email' => 'Email успешно обновлен!'
        ]);
    }

    public function updateNotification(Request $request) {
        if ($request->has('push_notification')) {
            $push_notification = true;
        }
        else {
            $push_notification = false;
        }

        if ($request->has('email_notification')) {
            $email_notification = true;
        }
        else {
            $email_notification = false;
        }

        $user = Auth::user();
        $user->update([
            'is_email_notification' => $email_notification,
            'is_push_notification' => $push_notification
        ]);

        return redirect()->back()->withSuccess([
            'notification' => 'Уведомления успешно обновлены!'
        ]);
    }
}
