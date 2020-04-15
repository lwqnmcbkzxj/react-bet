@extends('layouts.app')

@section('content')
    <section class="feedback">
        <div class="wrapper">
            <ul class="breadcrumbs">
                <li><a href="{{route('page.index')}}">Главная</a></li>
                <li>Личный кабинет</li>
            </ul>
            <form action="{{route('update.login')}}" method="post" class="mb-4">
                @csrf
                <input type="text" name="login" class="form-control mb-2" placeholder="Логин" value="{{$user->login}}">
                <button type="submit" class="btn btn-info">Поменять ник</button>
                @error('login')
                    <div class="alert alert-danger mt-2">{{ $message }}</div>
                @enderror
                @isset(session('success')['login'])
                    <div class="alert alert-success mt-2">{{session('success')['login']}}</div>
                @endisset
            </form>
            <form action="{{route('update.email')}}" method="post" class="mb-4">
                @csrf
                <input type="email" name="email" class="form-control mb-2" placeholder="Email" value="{{$user->email}}">
                <button type="submit" class="btn btn-info">Поменять почту</button>
                @error('email')
                    <div class="alert alert-danger mt-2">{{ $message }}</div>
                @enderror
                @isset(session('success')['email'])
                    <div class="alert alert-success mt-2">{{session('success')['email']}}</div>
                @endisset
            </form>
            <form action="{{route('update.notification')}}" method="post" class="feedback__form">
                {{csrf_field()}}
                <label class="feedback__label">
                    <input type="checkbox" name="push_notification" @if($user->is_push_notification) checked @endif>
                    Включить PUSH-уведомления
                </label>
                <label class="feedback__label">
                    <input type="checkbox" name="email_notification" @if($user->is_email_notification) checked @endif>
                    Включить Email-уведомления
                </label>
                <button id="personal-submit" type="submit" class="btn btn-info">Обновить</button>
                @isset(session('success')['notification'])
                    <div class="alert alert-success mt-2">{{session('success')['notification']}}</div>
                @endisset
            </form>
        </div>
    </section>

@endsection