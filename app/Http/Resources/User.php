<?php

namespace App\Http\Resources;

use App\Subscriber;
use App\User as UserModel;
use http\Env\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  $request
     * @return array
     */
    public function toArray($request)
    {
        $user_id = $this->id;
        return [
            "id" => $this->id,
            "role" => $this->role()->first(),
            "login" => $this->login,
            "balance" => $this->balance,
            "avatar" => $this->avatar,
            "rating_position" => $this->rating_position,
            "stats" => $this->stats,
            "last_five" => $this->last_five,
            'is_subscribed' => $this->when(auth('api')->check(), function () use ($request, $user_id) {
                return Subscriber::checkSubscription($user_id, auth('api')->id());
            })
        ];
    }

}
