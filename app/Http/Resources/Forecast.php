<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Forecast extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $response = parent::toArray($request);
        $response['comments'] = $request->comments;
        $response['forecast'] = $request->forecast;
        $response['user'] = $request->user()->first();
        return parent::toArray($request);
    }
}
