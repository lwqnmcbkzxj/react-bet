<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class Event extends JsonResource
{
    public function toArray($request)
    {

        $split_team = preg_split("* - *", $this->title);
        return [
            'event_id' => $this->id,
            'championship_data' => [
                'championship_id' => $this->championship->id,
                'championship' => $this->championship->name,
                'sport_id' => $this->sport->id,
                'sport_name' => $this->sport->name,
            ],
            'event' => $this->title,
            'event_start' => $this->start,
            'team_1' => ['name' => $split_team[0]],
            'team_2' => ['name' => $split_team[1]],
            'forecasts_count' => $this->forecasts_count];
    }
}
