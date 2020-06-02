<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UserForecast extends JsonResource
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
        $split_team = preg_split("* - *", $this->title);
        return [
            'id' => $this->forecast_id,
            'event_data' => [
                'championship_data' => [
                    'championship_id' => $this->championship_id,
                    'championship' => $this->championship_name,
                    'sport_id' => $this->sport_id,
                    'sport_name' => $this->sport_name,
                    'sport_image' => Storage::url('sports/' . $this->sport_logo),
                ],
                'event_id' => $this->event_id,
                'event' => $this->title,
                'event_start' => $this->start,
                'team_1' => ['name' => $split_team[0]],
                'team_2' => ['name' => $split_team[1]]
            ],
            'forecast_text' => $this->forecast_text,
            'forecast_created_at' => $this->created_at,
            'bet_data' => [
                'bet' => $this->bet,
                'coefficient' => $this->coefficient,
                'status' => $this->coefficients_status,
                'type' => $this->type,
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
