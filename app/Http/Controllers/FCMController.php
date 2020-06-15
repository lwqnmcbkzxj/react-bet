<?php

namespace App\Http\Controllers;

use App\FCMToken;
use App\Comment;
use App\Forecast;
use App\User;
use App\Vote;
use Illuminate\Http\Request;
use LaravelFCM\Facades\FCM;
use LaravelFCM\Message\OptionsBuilder;
use LaravelFCM\Message\PayloadDataBuilder;
use LaravelFCM\Message\PayloadNotificationBuilder;

class FCMController extends Controller
{
    public function register(Request $request)
    {
        $user = auth('api')->user();
        if ($user instanceof User) {
            $token = $user->fcm_tokens()->where('token', $request->get('token'))->first();
            if (!$token) {
                $token = new FCMToken();
                $token->token = $request->get('token');
                $user->fcm_tokens()->save($token);
            }
            return $user->fcm_tokens()->get('token')->map(function ($item){return $item->token;})->toArray();
        }
        return $this->sendError('Unauthorized', 4001);
    }
    public static function sendToTokens(array $tokens, $title, $text, $data)
    {
        $optionBuilder = new OptionsBuilder();
        $optionBuilder->setTimeToLive(60*20);
        $notificationBuilder = new PayloadNotificationBuilder($title);
        $notificationBuilder->setBody($text)
            ->setSound('default');
        $dataBuilder = new PayloadDataBuilder();
        $dataBuilder->addData($data);
        $option = $optionBuilder->build();
        $notification = $notificationBuilder->build();
        $data = $dataBuilder->build();
        // You must change it to get your tokens
        $data['notification']=['title','text'];
        $downstreamResponse = FCM::sendTo($tokens, $option, $notification, $data);
    }
    public static function sendToUser(User $user, $title, $text, $data)
    {
        sendToTokens($user->fcm_tokens()->get('token')->map(function ($item){return $item->token;})->toArray(), $title, $text, $data);
    }
    public static function sendVoteNotification(Vote $vote)
    {
        $user = null;
        switch ($vote->reference_to)
        {
            case 'forecasts':
                $forecast = Forecast::query()->where('id', $vote->referent_id)->first();
                $user = $forecast->user;
                $name = $vote->user()->first()->login;
                self::sendToUser($user, 'Ваш прогноз '.($vote->type == 'like' ? 'положительно' : 'отрицательно' ).'оценили', implode(' ', array_slice(explode(' ', $forecast->forecast_text), 0, 10)), ["vote"=>$vote]);
                break;
            case 'comments':
                $comment = Comment::query()->where('id', $vote->referent_id)->first();
                $user = $comment->user;
                $name = $vote->user()->first()->login;
                self::sendToUser($user, 'Ваш комментарий '.($vote->type == 'like' ? 'положительно' : 'отрицательно' ).'оценили',implode(' ', array_slice(explode(' ', $comment->text), 0, 10)), ["vote"=>$vote]);
                break;
            default:
                return;
        }
        if(!$user)
            return;
    }
    public static function sendNewForecastNotification(Forecast $forecast)
    {
        $user = $forecast->user();
        $userTokens = $user->subscribers()->has('fcm_tokens')->with('fcm_tokens')->get(['users.id'])->map(function ($item)
        {
            return collect($item->fcm_tokens)->map(function ($token)
            {
                return $token->token;
            });
        })->flatten();
        self::sendToTokens($userTokens, 'Появился новый прогноз от'.$user->login, implode(' ', array_slice(explode(' ', $forecast->forecast_text), 0, 10)),['forecast'=>$forecast]);
    }
    public static function sendCommentNotification(Comment $comment)
    {
        if ($comment->reference_to == 'forecasts') {
            $forecast = Forecast::query()->where('id', $comment->referent_id)->first();
            $user = $forecast->user;
            $name = $comment->user()->first()->login;
            self::sendToUser($user, 'Под вашим прогнозом оставили комментарий', implode(' ', array_slice(explode(' ', $comment->text), 0, 10)), ["vote" => $vote]);
        }
        if ($comment->replies_to)
        {
            $user = Comment::find($comment->replies_to)->user;
            self::sendToUser($user, 'На ваш комментарий под "'.$comment->referent_title.'" ответили', implode(' ', array_slice(explode(' ', $comment->text), 0, 10)), ["vote" => $vote]);
        }
    }
}
