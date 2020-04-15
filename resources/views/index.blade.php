@extends('layouts.app')

@section('head')
    <title>Betting HUB — Прогнозы на спорт</title>
@endsection

@section('content')
    <section class="front-page-main">
        <div class="wrapper">
            @error('auth')
                <div class="alert alert-danger mt-2">{{ $message }}</div>
            @enderror
            @if($value = \App\Option::where('key', 'alert')->first()->value)
                <div class="alert alert-warning">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" style="font-size:20px">×</span>
                    </button>
                    {{$value}}
                </div>
            @endif
            <div class="front-page-main__head">
                <h1 class="front-page-main__title">Прогнозы на спорт</h1>
            </div>
            <div class="front-page-main__forecasters">
                @forelse($users as $user)
                <div class="front-page-main__forecasters_item">
                    <a href="{{route('users.show', $user->id)}}" class="front-page-main__forecasters_img" style="background-image: url({{$user->avatar}});"></a>
                    <span class="front-page-main__forecasters_name">{{$user->login}}</span>
                    <span class="front-page-main__forecasters_roi">
                        ROI
                        @if($user->roi > 0)+@elseif($user->roi < 0)-@endif{{round($user->roi * 100, 2)}}%
                    </span>
                </div>
                @empty
                @endforelse
                <a href="{{route('page.rating')}}" class="front-page-main__moreForecasters">Все</a>
            </div>
            @forelse($forecasts as $forecast)
                @isset($forecast->user()->first()->id)
                @else
                    @continue
                @endisset
                <a href="{{route('users.show', $forecast->user_id)}}" class="forecast">
                    <div class="forecast__top">
                    <div class="forecast__topBox">
                        <div class="forecast__name">{{$forecast->user()->first()->login}}</div>
                        <span class="forecast__roi @if($forecast->user()->first()->roi($forecast->user->id) >= 0) forecast__roi_plus @else forecast__roi_minus @endif">
                                ROI @if($forecast->user->roi($forecast->user()->first()->id) >= 0) + @else - @endif{{round($forecast->user()->first()->roi($forecast->user->id) * 100, 2)}}%
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
            <a href="{{route('page.forecasts')}}" class="front-page-main__allForecasts">Все прогнозы</a>
        </div>
    </section>
@endsection