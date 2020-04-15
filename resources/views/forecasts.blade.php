@extends('layouts.app')

@section('head')
    <title>Betting HUB — Прогнозы</title>
@endsection

@section('content')
    <section class="front-page-main">
        <div class="wrapper">
            <ul class="breadcrumbs">
                <li><a href="{{route('page.index')}}">Главная</a></li>
                <li>Прогнозы</li>
            </ul>
            <div class="front-page-main__head">
                <h1 class="front-page-main__title">Прогнозы на спорт</h1>
                <button class="forecast__cogs">
                    <i class="fas fa-cogs"></i>
                </button>
                <ul class="front-page-main__types forecast__mobileHidden">
                    <li class="@if(!request()->has('subscriptions') || request()->query('subscriptions') === 'false') active @endif"><a href="{{ request()->fullUrlWithQuery(['subscriptions' => 'false']) }}">Общая</a></li>
                    <li class="@if(request()->query('subscriptions') === 'true') active @endif"><a href="{{ request()->fullUrlWithQuery(['subscriptions' => 'true']) }}">Подписки</a></li>
                </ul>
            </div>
            <ul class="front-page-main__types forecast__mobileFilter_margin forecast__hidden">
                <li class="@if(!request()->has('subscriptions') || request()->query('subscriptions') === 'false') active @endif"><a href="{{ request()->fullUrlWithQuery(['subscriptions' => 'false']) }}">Общая</a></li>
                <li class="@if(request()->query('subscriptions') === 'true') active @endif"><a href="{{ request()->fullUrlWithQuery(['subscriptions' => 'true']) }}">Подписки</a></li>
            </ul>
            <div class="front-page-main__head front-page-main__head_col forecast__mobileHidden forecast__mobileFilter">
                <ul class="front-page-main__types front-page-main__types_mb">
                    <li class="@if(!request()->has('sport_id') || request()->query('sport_id') === 'all') active @endif"><a href="{{ request()->fullUrlWithQuery(['sport_id' => 'all']) }}">Все</a></li>
                    <li class="@if(request()->query('sport_id') === 1) active @endif"><a href="{{ request()->fullUrlWithQuery(['sport_id' => 1]) }}">Футбол</a></li>
                    <li class="@if(request()->query('sport_id') === 2) active @endif"><a href="{{ request()->fullUrlWithQuery(['sport_id' => 2]) }}">Теннис</a></li>
                    <li class="@if(request()->query('sport_id') === 3) active @endif"><a href="{{ request()->fullUrlWithQuery(['sport_id' => 3]) }}">Баскетбол</a></li>
                    <li class="@if(request()->query('sport_id') === 4) active @endif"><a href="{{ request()->fullUrlWithQuery(['sport_id' => 4]) }}">Хокей</a></li>
                    <li class="@if(request()->query('sport_id') === 5) active @endif"><a href="{{ request()->fullUrlWithQuery(['sport_id' => 5]) }}">Другое</a></li>
                </ul>
                <ul class="front-page-main__types front-page-main__types_mb">
                    Ближайшие:
                    <li class="@if(request()->query('time') === '3') active @endif"><a href="{{ request()->fullUrlWithQuery(['time' => '3']) }}">3 часа</a></li>
                    <li class="@if(request()->query('time') === '6') active @endif"><a href="{{ request()->fullUrlWithQuery(['time' => '6']) }}">6 часов</a></li>
                    <li class="@if(request()->query('time') === '12') active @endif"><a href="{{ request()->fullUrlWithQuery(['time' => '12']) }}">12 часов</a></li>
                    <li class="@if(request()->query('time') === '24') active @endif"><a href="{{ request()->fullUrlWithQuery(['time' => '24']) }}">24 часов</a></li>
                    <li class="@if(!request()->has('time') || request()->query('time') === 'all') active @endif"><a href="{{ request()->fullUrlWithQuery(['time' => 'all']) }}">Все время</a></li>
                </ul>
            </div>

            @error('subscribe')
                <div class="alert alert-danger mt-2">{{ $message }}</div>
            @enderror


            @forelse($forecasts as $forecast)
                @isset($forecast->user()->first()->id)
                @else
                    @continue
                @endisset
                <a href="{{route('users.show', $forecast->user->id)}}" class="forecast">
                    <div class="forecast__top">
                        <div class="forecast__topBox">
                            <div class="forecast__name">{{$forecast->user->login}}</div>
                            <span class="forecast__roi @if($forecast->user->roi($forecast->user->id) >= 0) forecast__roi_plus @else forecast__roi_minus @endif">
                                ROI @if($forecast->user->roi($forecast->user->id) >= 0) + @else - @endif{{round($forecast->user->roi($forecast->user->id) * 100, 2)}}%
                            </span>
                        </div>
                        <div class="forecast__topBox">
                            <div class="forecast__sportType">{{{$forecast->event()->first()->sport()->first()->name}}}</div>
                            <span class="forecast__date">{{$forecast->created_at}}</span>
                        </div>
                    </div>
                    <div class="forecast__person">
                        <div class="forecast__row">
                            <div style="background-image: url({{$forecast->user->avatar}});" class="forecast__img"></div>
                            <div class="forecast__col">
                                <div class="forecast__championship">{{$forecast->event()->first()->championship()->first()->name}}</div>
                                <div class="forecast__teams">{{$forecast->title}}</div>
                                <div class="forecast__forecast">Прогноз: {{$forecast->coefficient()->first()->type}}</div>
                                <div class="forecast__coefficient">Кф. {{$forecast->coefficient()->first()->coefficient}}</div>
                                <div class="forecast__start">Начало игры: ({{$forecast->start}})
                                </div>
                            </div>
                        </div>
                        @if(\App\Option::where('key', 'hide_forecast_message')->first()->value)
                            <p class="forecast__content">{{$forecast->forecast}}</p>
                        @endif
                    </div>
                </a>
            @empty
            @endforelse
            {{$forecasts->links()}}
        </div>
    </section>
@endsection