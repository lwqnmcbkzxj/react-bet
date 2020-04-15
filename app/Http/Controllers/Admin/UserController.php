<?php

namespace App\Http\Controllers\Admin;

use App\Forecast;
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

        return view('admin.users.index', [
            'users' => $users->paginate(10)
        ]);
    }

    public function search(Request $request) {
        if ($request->has('s')) {
            $users = User::where('login', 'LIKE', '%'.$request->get('s').'%');
            return view('admin.users.index', [
                'users' => $users->paginate(10)
            ]);
        }
        else {
            return redirect()->route('admin.users.index');
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.users.create', [
            'user' => [],
        ]);
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
            return redirect()->route('admin.users.create')->withErrors(['login' => 'Данный логин уже существует']);
        }
        if (User::where('email', $request->get('email'))->exists()) {
            return redirect()->route('admin.users.create')->withErrors(['email' => 'Данный email уже существует']);
        }
        $user = User::create($request->except('avatar'));

        if($file=$request->file('avatar')){
            $name=time() . '-' . $file->getClientOriginalName();
            $file->move(public_path('storage/users/'.$user->id), $name);
            $image= '/storage/users/' . $user->id . '/' . $name;
            $user->update(['avatar' => $image]);
        }

        return redirect()->route('admin.users.edit', $user);
    }

    public function subscribe(Request $request, User $user) {
        if ($auth_user = Auth::user()) {
            if (!$auth_user->subscriptions()->find($user->id)) {
                $auth_user->subscriptions()->attach($user->id);
            }
            else {
                $auth_user->subscriptions()->detach($user->id);
            }
        }
        else {
            return 500;
        }

        return redirect()->route('users.show', [
            'user' => $user
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return view('single-user', [
            'user' => $user,
            'forecasts' => Forecast::where('user_id', $user->id)->orderBy('created_at', 'DESC')->get()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        return view('admin.users.edit', [
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

        return redirect()->route('admin.users.edit', $user);
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
        $user->delete();

        return redirect()->route('admin.users.index');
    }
}
