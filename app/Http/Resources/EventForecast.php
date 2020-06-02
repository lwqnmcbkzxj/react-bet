<?php

namespace App\Http\Resources;

use App\Subscriber;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class EventForecast extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $forecast_id = $this->forecast_id;
        $user_id = $this->user_id;
        return [
            'id' => $this->id,
            'user_data' => ['id' => $this->user_data->id,
                'role' => $this->user_data->role,
                'avatar' => $this->user_data->avatar,
                'login' => $this->user_data->login,
                'stats' => $this->user_data->stats,
                //'rating_position' => $this->user_data->rating_position,
                'last_five' => $this->user_data->last_five],
            'is_subscribed' => $this->when(auth('api')->check(), function () use ($request, $user_id) {
                return Subscriber::checkSubscription($user_id, auth('api')->id());
            }),
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
            'is_marked' => $this->when(auth('api')->check(), function () use ($request, $forecast_id){
                return ( auth('api')->user()->follow_forecasts()->where('forecast_id',$forecast_id)->first()? true : false);
            }),
            'vote' => $this->when(auth('api')->check(), function () use ($request, $forecast_id){
                $vote = auth('api')->user()->votes()->where('reference_to', 'forecasts')->where('referent_id',$forecast_id)->first();
                return $vote ? $vote->type : null;
            })];
    }
}
