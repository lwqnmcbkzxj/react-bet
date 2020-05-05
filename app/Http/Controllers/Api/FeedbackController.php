<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FeedbackController extends Controller
{
    public function sendMail(Request $request) {
        if($value = \App\Option::where('key', 'scripts_footer')->first()->value) {
            $mail_to = $value;
        }
        else {
            $mail_to = 'kutsenko.and@gmail.com';
        }

        $user_email = $request['user_email'];
        $message = $request['message'];


        $thm = 'Обратная связь с сайта BetHub';
        $message = "
                Email: ".htmlspecialchars($user_email)."<br />
                Сообщение: ".htmlspecialchars($message);
        $headers = array(
            'content-type: text/html',
        );
        if (mail($mail_to, $thm, $message, $headers)) {
            return 200; // Успешно отправлен
        } else {
            return 400; // Не удалось отправить
        }
    }
}
