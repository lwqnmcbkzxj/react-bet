@extends('admin.layouts.app')

@section('content')
    <div class="container">
        @component('admin.components.breadcrumbs')
            @slot('title') Список пользователей @endslot
            @slot('parent') Главная @endslot
            @slot('active') Пользователи @endslot
        @endcomponent
        <hr>

        <a href="{{route('admin.users.create')}}" class="btn btn-primary pull-right mb-3 d-flex align-items-center">
            <i class="fa fa-plus-square-o mr-1"></i>
            Добавить нового пользователя
        </a>

        <ul class="nav nav-pills mb-3">
            <li class="nav-item">
                <a class="nav-link @if(!request()->has('role') || request()->query('role') === 'all') active @endif" href="{{route('admin.users.index', ['role' => 'all'])}}">Все</a>
            </li>
            <li class="nav-item">
                <a class="nav-link @if(request()->query('role') === '1') active @endif" href="{{route('admin.users.index', ['role' => '1'])}}">Пользователи</a>
            </li>
            <li class="nav-item">
                <a class="nav-link @if(request()->query('role') === '2') active @endif" href="{{route('admin.users.index', ['role' => '2'])}}">Роботы-прогнозисты</a>
            </li>
            <li class="nav-item">
                <a class="nav-link @if(request()->query('role') === '3') active @endif" href="{{route('admin.users.index', ['role' => '3'])}}">Модераторы</a>
            </li>
            <li class="nav-item">
                <a class="nav-link @if(request()->query('role') === '4') active @endif" href="{{route('admin.users.index', ['role' => '4'])}}">Администраторы</a>
            </li>
        </ul>

        <form action="{{route('admin.users.export')}}" class="mb-4" method="post">
            {{csrf_field()}}
            <button type="submit" class="btn btn-dark">Экспортировать пользователей</button>
        </form>

        <form action="{{route('admin.users.search')}}" method="get" class="mb-4 d-flex pull-left">
            {{csrf_field()}}
            <input type="text" class="form-control mr-3" placeholder="Поиск по логину" name="s" value="<?php if (request()->has('s')) {echo request()->get('s');} ?>">
            <button type="submit" class="btn btn-primary">Поиск</button>
        </form>

        <table class="table table-striped">
            <thead>
            <tr>
                <th>ID</th>
                <th>Логин</th>
                <th>Дата регистрации</th>
                <th>Платформа</th>
                <th>Роль</th>
                <th>Кол-во прогнозов</th>
                <th class="text-right">Действие</th>
            </tr>
            </thead>
            <tbody>
            @forelse($users as $user)
                <tr>
                    <td>{{$user->id}}</td>
                    <td>{{$user->login}}</td>
                    <td>{{$user->created_at}}</td>
                    <td>{{$user->platform}}</td>
                    <td>
                        @if($user->role_id === 1)
                            Пользователь
                        @endif
                        @if($user->role_id === 2)
                            Робот-прогнозист
                        @endif
                        @if($user->role_id === 3)
                            Модератор
                        @endif
                        @if($user->role_id === 4)
                            Администратор
                        @endif
                        @if($user->role_id === 5)
                            Технический администратор
                        @endif
                    </td>
                    <td>
                        {{$user->forecasts()->count()}}
                    </td>
                    <td>
                        <form class="d-flex justify-content-end"
                              onsubmit="if (confirm('Удалить?')){return true;} else {return false;} " action="{{route('admin.users.destroy', $user)}}" method="post">
                            <input type="hidden" name="_method" value="DELETE">
                            {{csrf_field()}}
                            <a href="{{route('admin.forecasts.user', $user)}}" class="btn btn-info mr-2">
                                <i class="fa fa-list" aria-hidden="true"></i>
                            </a>
                            <a class="btn btn-secondary mr-2"  href="{{route('admin.users.edit', $user)}}">
                                <i class="fa fa-edit"></i>
                            </a>
                            <button type="submit" class="btn"><i class="fa fa-trash-o"></i></button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="7" class="text-center">
                        <h2>Данные отсутствуют</h2>
                    </td>
                </tr>
            @endforelse
            </tbody>
            <tfoot>
            <tr>
                <td colspan="7">
                    <ul class="pagination pull-right">
                        {{$users->appends(request()->input())->links()}}
                    </ul>
                </td>
            </tr>
            </tfoot>
        </table>

    </div>
@endsection