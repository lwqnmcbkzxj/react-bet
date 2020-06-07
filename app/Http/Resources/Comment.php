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
        $comment_id = $this->id;
        $response['user_name'] = $user->login;
        $response['user_avatar'] = $user->avatar;
        if ($this->replies_to)
            $response['replies_to_name'] = \App\Comment::query()->where('id', '=', $this->replies_to)->first()->user->login;
        $response['vote'] = $this->when(auth('api')->check(), function () use ($request, $comment_id){
        $vote = auth('api')->user()->votes()->where('reference_to', 'comments')->where('referent_id', $comment_id)->first();
        return $vote ? $vote->type : null; });
        return $response;
    }
}
