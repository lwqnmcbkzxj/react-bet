<?php

namespace App\Http\Resources;

use App\Subscriber;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use phpDocumentor\Reflection\Types\Integer;

class Forecast extends JsonResource
{
    public function toArray($request)
    {
        $forecast_id = $this->forecast_id;
        $user_id = $this->user_id;
        $split_team = preg_split("* - *", $this->event->title);
        return [
            'id' => $this->id,
            'user_data' => ['id' => $this->user_data->id,
                'role' => $this->user_data->role,
                'avatar' => $this->user_data->avatar,
                'login' => $this->user_data->login,
                'stats' => $this->user_data->stats,

                'last_five' => $this->user_data->last_five,
                'is_subscribed' => $this->when(auth('api')->check(), function () use ($request, $user_id) {
                    return Subscriber::checkSubscription($user_id, auth('api')->id());
                })],

            'event_data' => [
                'championship_data' => [
                    'championship_id' => $this->event->championship->id,
                    'championship' => $this->event->championship->name,
                    'sport_id' => $this->event->sport->id,
                    'sport_name' => $this->event->sport->name,
                    'sport_image'=>$this->event->sport->image,
                ],
                'event_id' => $this->event->id,
                'event' => $this->event->title,
                'event_start' => $this->event->start,
                'team_1' => ['name'=>$split_team[0]],
                'team_2' => ['name'=>$split_team[1]]
            ],
            'forecast_text' => $this->forecast_text,
            'forecast_created_at'=>$this->created_at,
            'bet_data' => [
                'bet' => $this->bet,
                'coefficient' => $this->coefficient->coefficient,
                'type' => $this->coefficient->type,
                'pure_profit' => (($this->coefficient->coefficient) - 1),
            ],
            'forecast_stats' => [
                'count_subscribers' => $this->subscribers->count(),
                'count_comments' => $this->comments->count(),
                'rating' => intval($this->rating)
            ],
            'is_marked' => $this->when(auth('api')->check(), function () use ($request, $forecast_id){
                return ( auth('api')->user()->follow_forecasts()->where('forecast_id',$forecast_id)->first()? true : false);
            }),
            'vote' => $this->when(auth('api')->check(), function () use ($request, $forecast_id){
                $vote = auth('api')->user()->votes()->where('reference_to', 'forecasts')->where('referent_id',$forecast_id)->first();
                return $vote ? $vote->type : null;
            })
        ];
    }
}
