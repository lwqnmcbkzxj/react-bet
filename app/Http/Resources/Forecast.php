<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class Forecast extends JsonResource
{
    public function toArray($request)
    {
//       $response = parent::toArray($request);
//       $response['user_data'] = $this->user_data;
//       $response['event'] = $this->event;
//       $response['comments'] = $this->comments;
        $split_team = preg_split("* - *", $this->event->title);
        return [
            'id' => $this->id,
            'user_data' => ['id' => $this->user_data->id,
                'role' => $this->user_data->role,
                'avatar' => $this->user_data->avatar,
                'login' => $this->user_data->login,
                'stats' => $this->user_data->stats,
                //'rating_position' => $this->user_data->rating_position,
                'last_five' => $this->user_data->last_five],
            'event_data' => [
                'championship_data' => [
                    'championship_id' => $this->event->championship->id,
                    'championship' => $this->event->championship->name,
                    'sport_id' => $this->event->sport->id,
                    'sport_name' => $this->event->sport->name,
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
                'rating' => $this->rating
            ],
            'is_subscribed' => $this->when(Auth::check(), function () {
                return Auth::user()->hasSubscription($this->id);
            }),
            'vote' => $this->when(Auth::check(), function () {
                return Auth::user()->votes()->find($this->id);
            })
        ];
    }
}
