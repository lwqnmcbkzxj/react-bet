<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use function MongoDB\BSON\toJSON;

class EventProfile extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        $split_team = preg_split("* - *", $this->title);
        return ['event_id' => $this->id,
            'championship_data' => [
                'championship_id' => $this->championship->id,
                'championship' => $this->championship->name,
                'sport_id' => $this->sport->id,
                'sport_name' => $this->sport->name,
                'sport_image'=>$this->sport->image,
            ],
            'event' => $this->title,
            'event_start' => $this->start,
            'team_1' => ['name' => $split_team[0]],
            'team_2' => ['name' => $split_team[1]],
            'forecasts_count' => $this->forecasts_count,
            'forecasts' => (new EventForecastCollection($this->forecasts()->get()))];
    }
}
