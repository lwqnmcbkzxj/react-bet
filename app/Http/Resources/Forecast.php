<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Forecast extends JsonResource
{
   public function toArray($request)
   {
       $response = parent::toArray($request);
       $response['user_data'] = $this->user_data;
       $response['event'] = $this->event;
       $response['comments'] = $this->comments;
       return $response;
   }
}
