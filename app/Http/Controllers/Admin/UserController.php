<?php

namespace App\Http\Controllers\Admin;

use App\Forecast;
use App\Subscriber;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (!$request->has('order_by')) {
            $request['order_by'] = 'id';
        }
        if (!$request->has('limit')) {
            $request['limit'] = 15;
        }
        $res = User::query();
        if($request->has('search')&&$request->has('search_by') && ($request['search']!='' && $request['search_by']!=''))
        {
            $res = $res->where($request->search_by, 'LIKE', "%" . $request->search . "%");
        }
        return $this->sendResponse(User::query()->paginate($request['limit']),'Success',200);
    }

    public function search(Request $request) {
            if (!$request->has('order_by')) {
                $request['order_by'] = 'id';
            }
            if (!$request->has('limit')) {
                $request['limit'] = 15;
            }
            $res = User::query();
            if($request->has('search')&&$request->has('search_by') && ($request['search']!='' && $request['search_by']!=''))
            {
                $res = $res->where($request->search_by, 'LIKE', "%" . $request->search . "%");
            }
            return $this->sendResponse($res->paginate($request['limit'] = 15),'Success',200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return json_encode(['user' => []]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (User::where('login', $request->get('login'))->exists()) {
            return $this->sendError('Данный логин уже существует', 400);
        }
        if (User::where('email', $request->get('email'))->exists()) {
            return $this->sendError('Данный email уже существует', 400);
        }
        $user = User::create($request->except('avatar'));

        if($file=$request->file('avatar')){
            $name=time() . '-' . $file->getClientOriginalName();
            $file->move(public_path('storage/users/'.$user->id), $name);
            $image= '/storage/users/' . $user->id . '/' . $name;
            $user->update(['avatar' => $image]);
        }
        return $this->sendResponse($user,'Success',200);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return $this->sendResponse(['user'=>$user],'Success', 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        if ($user->role_id === 5) {
            $user->update($request->except(['avatar', 'role_id']));
        }
        else {
            $user->update($request->except('avatar'));
        }

        if($file=$request->file('avatar')){
            $name=time() . '-' . $file->getClientOriginalName();
            $file->move(public_path('storage/users/'.$user->id), $name);
            $image= '/storage/users/' . $user->id . '/' . $name;
            $user->update(['avatar' => $image]);
        }

        return $this->sendResponse($user,'Success',200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->forecasts()->delete();
        $user->subscribers()->detach($user->id);
        $user->subscriptions()->detach($user->id);
        $user->delete();
        return $this->sendResponse('','Успешно удалено',200);
    }
}
