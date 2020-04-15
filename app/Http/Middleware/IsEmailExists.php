<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class IsEmailExists
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = Auth::user();
        if ($user) {
            if ($user->email !== null) {
                return $next($request);
            }
            else {
                return redirect()->route('profile')->withErrors(['email' => 'Пожалуйста, укажите свой email, чтобы дальше пользоваться сайтом']);
            }
        }
        else {
            return $next($request);
        }
    }
}
