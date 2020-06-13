<?php

namespace App\Http\Resources;

use App\Http\Middleware\Authenticate;
use App\Subscriber;
use GuzzleHttp\Middleware;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AdminForecast extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        $forecast_id = $this->forecast_id;
        $user_id = $this->user_id;
        $split_team = preg_split("* - *", $this->event_title);
        return [
            'id' => $this->forecast_id,
            'user_data' => [
                'id' => $this->user_id,
                'role' => [
                    'id' => $this->role_id,
                    'name' => $this->role_name,
                    'label' => $this->role_label
                ],
                'avatar' => $this->user_avatar,
                'login' => $this->user_login,
                'stats' => [
                    'roi' => $this->roi,
                    'average_cofficient' => $this->average_cofficient,
                    'pure_profit' => $this->pure_profit,
                    'count_win' => $this->count_win,
                    'count_loss' => $this->count_loss,
                    'count_wait' => $this->count_wait,
                    'count_back' => $this->count_back,
                    'count_subscribers' => $this->count_subscribers,
                    'count_subscriptions' => $this->count_subscriptions
                ],
                'last_five' => \App\User::getLastFive($this->user_id),
                'is_subscribed' => $this->when(auth('api')->check(), function () use ($request, $user_id) {
                    return Subscriber::checkSubscription($user_id, auth('api')->id());
                }),
                ],
            'event_data' => [
                'championship_data' => [
                    'championship_id' => $this->championship_id,
                    'championship' => $this->championship_name,
                    'sport_id' => $this->sport_id,
                    'sport_name' => $this->sport_name,
                    'sport_image' => Storage::url('sports/' . $this->sport_logo),
                ],
                'event_id' => $this->event_id,
                'event' => $this->event_title,
                'event_start' => $this->event_start,
                'team_1' => ['name' => $split_team[0]],
                'team_2' => ['name' => $split_team[1]]
            ],
            'forecast_text' => $this->forecast_text,
            'is_shown' => $this->is_shown,
            'forecast_created_at' => $this->created_at,
            'bet_data' => [
                'bet' => $this->bet,
                'coefficient' => $this->coefficient,
                'status' => $this->coefficients_status,
                'type' => $this->coefficient_type,
                'pure_profit' => ($this->coefficient - 1)
            ],
            'forecast_stats' => [
                'count_subscribers' => $this->subscribers_count,
                'count_comments' => $this->comments_count,
                'rating' => intval($this->rating)
            ],
            'is_marked' => $this->when(auth('api')->check(), function () use ($request, $forecast_id){
                return ( auth('api')->user()->follow_forecasts()->where('forecast_id',$forecast_id)->first()? true : false);
            }),
            'vote' => $this->when(auth('api')->check(), function () use ($request, $forecast_id){
                $vote = auth('api')->user()->votes()->where('reference_to', 'forecasts')->where('referent_id',$forecast_id)->first();
                return $vote ? $vote->type : null;
            })];
    }
}
