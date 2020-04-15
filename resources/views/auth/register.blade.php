@extends('layouts.app')

@section('content')

<section class="feedback">
    <div class="wrapper">
        <ul class="breadcrumbs">
            <li><a href="{{route('page.index')}}">Главная</a></li>
            <li>Регистрация</li>
        </ul>
        <form action="{{ route('register') }}" method="post" class="feedback__form">
            @csrf
            <input type="text" name="login" placeholder="Ваш логин" class="form-control mb-2 @error('login') is-invalid @enderror" required autocomplete="login" autofocus>
            @error('login')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
            <input type="text" name="email" placeholder="Email" class="form-control mb-2 @error('email') is-invalid @enderror" required autocomplete="email">
            @error('email')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
            <input type="password" name="password" placeholder="Пароль" class="form-control mb-2 @error('password') is-invalid @enderror" required autocomplete="new-password">
            @error('password')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
            <input type="password" name="password_confirmation" placeholder="Повторить пароль" class="form-control mb-2" required autocomplete="new-password">
            <button type="submit" class="btn btn-primary">Отправить</button>
        </form>
    </div>
</section>

@endsection
