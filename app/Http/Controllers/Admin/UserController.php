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
        $users = User::orderBy('created_at', 'desc');
        if ($request->has('role') && $request['role'] !== 'all') {
            $users = $users->where('role_id', $request['role']);
        }
        return $this->sendResponse($users->paginate(10),'Success',200);

    }

    public function search(Request $request) {
        if ($request->has('s')) {
            $users = User::where('login', 'LIKE', '%'.$request->get('s').'%');
            return  json_encode([
                'users' => $users->paginate(10)->toJSON()
            ]);
        }
        else {
            return json_encode([
                'users' => []
            ]);
        }
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

        return json_encode($user);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return $this->sendResponse([
            'user' => $user,
            'forecasts' => Forecast::where('user_id', $user->id)->orderBy('created_at', 'DESC')->get(),
            'subscribers' => $user->subscribers()->get(),
            'subscriptions' => Subscriber::where('subscriber_id', $user->id)->get()
        ],'Success', 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        return json_encode([
            'user' => $user
        ]);
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

        return json_encode($user);
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
