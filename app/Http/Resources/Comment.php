<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Comment extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        $response = parent::toArray($request);
        $user = \App\User::find($this->user_id);
        $response['user_name'] = $user->login;
        $response['user_avatar'] = $user->avatar;
        if($this->replies_to)
            $response['replies_to_name'] = \App\Comment::query()->where('id','=', $this->replies_to)->first()->user->login;
        return $response;
    }
}
