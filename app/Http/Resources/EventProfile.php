<?php

namespace App\Http\Resources;

use App\Coefficient;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
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
        $coefficients = collect($this->coefficients()->get(['id','type']));
        if($coefficients->count()<6)
        {
            $limit = 6-$coefficients->count();
            $types = DB::table('coefficients')->select('type')->inRandomOrder()->where('event_id','!=','event_id')->groupBy('type')->limit($limit)->get();
            foreach ($types as $type)
            {
                $type->forecast_count=0;
                $coefficients->push($type);
            }
        }

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
            'coefficients' => $coefficients,
            'event_start' => $this->start,
            'team_1' => ['name' => $split_team[0]],
            'team_2' => ['name' => $split_team[1]],
            'forecasts_count' => $this->forecasts_count,
            'forecasts' => (new EventForecastCollection($this->forecasts()->get()))];
    }
}
