<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Laravel\Socialite\Facades\Socialite;
use App\User;
use Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/profile';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * Redirect the user to the GitHub authentication page.
     *
     * @return \Illuminate\Http\Response
     */
    public function redirectToProviderVK()
    {
        return Socialite::with('vkontakte')->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallbackVK()
    {
        $vk_user = Socialite::driver('vkontakte')->user();

        $user = User::where('provider', 'vk')->where('provider_id', $vk_user->id)->first();

        if (!$user) {
            if (!User::where('email', $vk_user->email)->exists()) {
                $last_user = User::latest()->first();

                if (preg_match('/iPhone/i', request()->userAgent())) {
                    $platform = 'IOS';
                }
                elseif (preg_match('/Android/i', request()->userAgent())) {
                    $platform = 'Android';
                }
                else {
                    $platform = 'PC';
                }

                if ($vk_user->nickname !== null) {
                    $user = User::create([
                        'login' => $vk_user->nickname,
                        'avatar' => $vk_user->avatar,
                        'email' => $vk_user->email,
                        'provider' => 'vk',
                        'provider_id' => $vk_user->id,
                        'platform' => $platform
                    ]);
                }
                else {
                    $user = User::create([
                        'login' => 'vk_user_'. ++$last_user->id,
                        'avatar' => $vk_user->avatar,
                        'email' => $vk_user->email,
                        'provider' => 'vk',
                        'provider_id' => $vk_user->id,
                        'platform' => $platform
                    ]);
                }
            }
            else {
                return redirect()->route('page.index')->withErrors(['auth' => 'Ошибка авторизации. Пользователь с таким email уже существует']);
            }
        }

        Auth::login($user, true);

        return redirect($this->redirectTo);
    }

    public function redirectToProviderFacebook () {
        return Socialite::with('facebook')->redirect();
    }

    public function handleProviderCallbackFacebook() {
        $facebook_user = Socialite::driver('facebook')->user();

        $user = User::where('provider', 'facebook')->where('provider_id', $facebook_user->id)->first();

        if (!$user) {
            if (!User::where('email', $facebook_user->email)->exists()) {
                $last_user = User::latest()->first();

                if (preg_match('/iPhone/i', request()->userAgent())) {
                    $platform = 'IOS';
                } elseif (preg_match('/Android/i', request()->userAgent())) {
                    $platform = 'Android';
                } else {
                    $platform = 'PC';
                }
                $user = User::create([
                    'login' => 'facebook_user_' . ++$last_user->id,
                    'avatar' => $facebook_user->avatar_original,
                    'email' => $facebook_user->email,
                    'provider' => 'facebook',
                    'provider_id' => $facebook_user->id,
                    'platform' => $platform
                ]);
            }
            else {
                return redirect()->route('page.index')->withErrors(['auth' => 'Ошибка авторизации. Пользователь с таким email уже существует']);
            }
        }

        Auth::login($user, true);

        return redirect($this->redirectTo);
    }

    public function redirectToProviderGoogle () {
        return Socialite::with('Google')->redirect();
    }

    public function handleProviderCallbackGoogle () {
        $google_user = Socialite::driver('Google')->user();

        $user = User::where('provider', 'google')->where('provider_id', $google_user->id)->first();

        if (!$user) {
            if (!User::where('email', $google_user->email)->exists()) {
                $last_user = User::latest()->first();

                if (preg_match('/iPhone/i', request()->userAgent())) {
                    $platform = 'IOS';
                } elseif (preg_match('/Android/i', request()->userAgent())) {
                    $platform = 'Android';
                } else {
                    $platform = 'PC';
                }
                $user = User::create([
                    'login' => 'google_user_' . ++$last_user->id,
                    'avatar' => $google_user->avatar,
                    'email' => $google_user->email,
                    'provider' => 'google',
                    'provider_id' => $google_user->id,
                    'platform' => $platform
                ]);
            }
            else {
                return redirect()->route('page.index')->withErrors(['auth' => 'Ошибка авторизации. Пользователь с таким email уже существует']);
            }
        }

        Auth::login($user, true);

        return redirect($this->redirectTo);
    }
}
