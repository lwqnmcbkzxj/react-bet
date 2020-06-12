<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;


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
    public function __construct()
    {
        $this->FRONTEND_REDIRECT = env('FRONTEND_REDIRECT','https://betthub.org');
    }

    use AuthenticatesUsers;
    public function redirectToProvider(Request $request, string $driver)
    {
        if(!$request->has('redirect_to'))
            $request['redirect_to']=$this->FRONTEND_REDIRECT;
        return Socialite::driver($driver)->stateless()->with(['state'=>$request['redirect_to']])->redirect();
    }
    private function translit($s) {
        $s = (string) $s;
        $s = trim($s); // убираем пробелы в начале и конце строки
        $s = strtr($s, array('а'=>'a','б'=>'b','в'=>'v','г'=>'g','д'=>'d','е'=>'e','ё'=>'e','ж'=>'j','з'=>'z','и'=>'i','й'=>'y','к'=>'k','л'=>'l','м'=>'m','н'=>'n','о'=>'o','п'=>'p','р'=>'r','с'=>'s','т'=>'t','у'=>'u','ф'=>'f','х'=>'h','ц'=>'c','ч'=>'ch','ш'=>'sh','щ'=>'shch','ы'=>'y','э'=>'e','ю'=>'yu','я'=>'ya','ъ'=>'','ь'=>'','А'=>'A','Б'=>'B','В'=>'V','Г'=>'G','Д'=>'D','Е'=>'E','Ё'=>'E','Ж'=>'J','З'=>'Z','И'=>'I','Й'=>'Y','К'=>'K','Л'=>'L','М'=>'M','Н'=>'N','О'=>'O','П'=>'P','Р'=>'R','С'=>'S','Т'=>'T','У'=>'U','Ф'=>'F','Х'=>'H','Ц'=>'C','Ч'=>'CH','Ш'=>'SH','Щ'=>'SHCH','Ы'=>'Y','Э'=>'E','Ю'=>'YU','Я'=>'YA','Ъ'=>'','Ь'=>''));
        $s = str_replace(" ", "_", $s); // заменяем пробелы знаком минус
        return $s; // возвращаем результат
    }
    public function makeLogin($nickname, $name)
    {
        if($nickname)
            return $this->translit($nickname) .'_'.uniqid();
        else if ($name)
            return $this->translit($name) .'_'.random_int(0,9999);
        else
            return 'user_'.uniqid();
    }
    public function handleProviderCallback(Request $request, string $driver)
    {
        $auth_user = Socialite::driver($driver)->stateless()->user();
        if($auth_user->email)
            $user = User::query()->where('email',$auth_user->email)->first();
        else
            $user = User::query()->where('provider',$driver)->where('provider_id',$auth_user->id)->first();
        if(!$user)
        {
            $user = new User();
            $user->provider = $driver;
            $user->provider_id = $auth_user->id;
            $user->login = $this->makeLogin($auth_user->nickname, $auth_user->name);
            $user->email = $auth_user->email;
            $user->avatar = $auth_user->avatar;
            $user->save();
        }
        $token = $user->createToken('social')->accessToken;
        return redirect()->to($request->get('state', $this->FRONTEND_REDIRECT) .'?token='.$token);
    }
}
