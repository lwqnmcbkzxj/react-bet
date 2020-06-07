<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Post extends JsonResource
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
        $post_id = $this->id;
        $response['vote'] = $this->when(auth('api')->check(), function () use ($request, $post_id){
            $vote = auth('api')->user()->votes()->where('reference_to', 'posts')->where('referent_id', $post_id)->first();
            return $vote ? $vote->type : null; });
        return $response;
    }
}
