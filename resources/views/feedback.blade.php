@extends('layouts.app')

@section('head')
    <title>Betting HUB — Обратная связь</title>
@endsection

@section('content')
    <section class="feedback">
        <div class="wrapper">
            <ul class="breadcrumbs">
                <li><a href="{{route('page.index')}}">Главная</a></li>
                <li>Обратная связь</li>
            </ul>
            <form id="feedback__form" class="feedback__form">
                <input type="text" name="user_email" value="{{Auth::user()->email ?? ''}}" placeholder="Email" class="feedback__input feedback__form-control" required>
                <textarea name="message" id="" rows="5" class="feedback__textarea feedback__form-control" placeholder="Ваши пожелания и предложения" required></textarea>
                <button id="feedback-submit" type="submit" class="feedback__submit">Отправить</button>
            </form>
        </div>
    </section>
@endsection