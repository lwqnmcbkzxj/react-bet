<?php

namespace App\Http\Resources;

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
        $user = $this;
        return [
            'id' => $user->id,
            'role' => $user->role()->first(),
            'avatar' => $user->avatar,
            'login' => $user->login,
            'stats' => $user->stats
        ];
    }

}
