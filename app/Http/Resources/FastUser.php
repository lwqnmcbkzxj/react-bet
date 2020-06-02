<?php

namespace App\Http\Resources;

use App\User as UserModel;
use http\Env\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FastUser extends JsonResource
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
        return ['id' => $this->id,
            'role' => [
                'id' => $this->role_id,
                'name' => $this->role_name,
                'label' => $this->role_label
            ],
            'avatar' => $this->avatar,
            'login' => $this->login,
            "balance" => $this->balance,
            'stats' => [
                'roi' => $this->roi,
                'average_cofficient' => $this->average_cofficient,
                'pure_profit' => $this->pure_profit,
                'count_win' => $this->count_win,
                'count_loss' => $this->count_loss,
                'count_wait' => $this->count_wait,
                'count_back' => $this->count_back,
                'count_subscribers' => $this->count_subscribers,
                'count_subscriptions' => $this->count_subscriptions
            ],
            'rating_position'=> $this->rating_position,
            'last_five' => \App\User::getLastFive($this->id),
            'subscribed' => $this->when($request->user(), function () use ($request, $user_id){
                return ( $request->user->subscriptions()->where('user_id',$user_id)->first()? true : false);
            }),
        ];
    }

}
