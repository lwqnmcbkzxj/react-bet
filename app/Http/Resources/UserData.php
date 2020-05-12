<?php

namespace App\Http\Resources;

use App\User as UserModel;
use http\Env\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserData extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'role' => $this->role,
            'avatar' => $this->avatar,
            'login' => $this->login,
            'stats' => $this->stats,
            'last_five'=> $this->last_five
        ];
    }

}
