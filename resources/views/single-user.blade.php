@extends('layouts.app')

@section('head')
    <title>Betting HUB — Профиль прогнозиста</title>
@endsection

@section('content')
    <section class="profile">
        <div class="wrapper">
            <ul class="breadcrumbs">
                <li><a href="{{route('page.index')}}">Главная</a></li>
                <li>Профиль</li>
                <li>{{$user->login}}</li>
            </ul>
            <div class="profile__box">
                <div class="profile__head">
                    <div class="profile__img" style="background-image: url({{$user->avatar}});"></div>
                    <div class="profile__col">
                        <h1 class="profile__name">{{$user->login}}</h1>
                        <div class="profile__row">
                            <div class="profile__balance"><i class="fas fa-piggy-bank"></i> Банк: {{$user->balance}} xB</div>
                            <div class="profile__roitext">
                                <span class="profile__roi @if($user->roi($user->id) >= 0) rating__roi_plus @else rating__roi_minus @endif"> @if($user->roi($user->id) >= 0) + @endif{{round($user->roi($user->id) * 100, 2)}}%</span>
                                ROI за все время
                            </div>
                            @if($pure_profit = $user->pureProfit($user->id))
                            <div class="profile__profit ml-3">
                                <span class="profile__roi @if($user->roi($user->id) >= 0) rating__roi_plus @else rating__roi_minus @endif">
                                    @if($user->roi($user->id) >= 0) + @endif{{$pure_profit}}
                                </span>
                                Чистой прибыли за всё время
                            </div>
                            @endif
                        </div>
                    </div>
                </div>
                <div class="profile__statistic">
                    <div class="profile__stat">
                        <div>Побед</div>
                        <span class="profile__stat_win">{{$user->stats($user->id)->count_win}}</span>
                    </div>
                    <div class="profile__stat">
                        <div>Поражений</div>
                        <span class="profile__stat_lose">{{$user->stats($user->id)->count_lose}}</span>
                    </div>
                    <div class="profile__stat">
                        <div>Возвратов</div>
                        <span class="profile__stat_back">{{$user->stats($user->id)->count_back}}</span>
                    </div>
                </div>
                <div class="profile__ratingBox">
                    <div class="profile__rating profile__stat">
                        <div>Место</div>
                        <span>{{$user->ratingPosition($user->id)}}</span>
                    </div>
                    <div class="profile__rating profile__stat">
                        <div>Подписчики</div>
                        <span>{{$user->subscribers()->count()}}</span>
                    </div>
                </div>
                <form action="{{route('users.subscribe', ['user' => $user])}}" method="post">
                    {{csrf_field()}}
                    @auth
                        <input type="hidden" name="user_id" value="{{Auth::id()}}">
                        <input type="hidden" name="forecaster_id" value="{{$user->id}}">
                        @if(!Auth::user()->subscriptions()->find($user->id))
                            <button id="subscribe-btn" class="profile__subscribe">
                                Подписаться
                            </button>
                        @else
                            <button id="subscribe-btn" class="profile__subscribe profile__subscribe_done">
                                Отписаться
                            </button>
                        @endif
                    @else
                        <button id="subscribe-btn" class="profile__subscribe">
                            Подписаться
                        </button>
                    @endauth
                </form>
            </div>
            <div class="forecast_all">
                @forelse($forecasts as $forecast)
                    <div class="forecast @if($forecast->coefficient()->first()->status === 2) forecast_win @elseif($forecast->coefficient()->first()->status === 3) forecast_lose @endif">
                        <div class="forecast__top">
                            <div class="forecast__topBox">
                                <span>
                                    @if($forecast->coefficient()->first()->status === 1) Возможный выигрыш: @else Итог:  @endif
                                    <span class="forecast__result @if($forecast->coefficient()->first()->status === 2) forecast__result_win @elseif($forecast->coefficient()->first()->status === 3) forecast__result_lose @endif">
                                        @if($forecast->coefficient()->first()->status === 2 || $forecast->coefficient()->first()->status === 1)
                                            + {{$forecast->bet * $forecast->coefficient()->first()->coefficient}}
                                        @elseif($forecast->coefficient()->first()->status === 3 )
                                            - {{$forecast->bet}}
                                        @else
                                            вовзрат {{$forecast->bet}}
                                        @endif
                                    </span>
                                </span>
                            </div>
                            <div class="forecast__topBox">
                                <div class="forecast__sportType">{{{$forecast->event()->first()->sport()->first()->name}}}</div>
                                <span class="forecast__date">{{$forecast->created_at}}</span>
                            </div>
                        </div>
                        <div class="forecast__person">
                            <div class="forecast__row">
                                <div style="background-image: url({{$user->avatar}});" class="forecast__img"></div>
                                <div class="forecast__col">
                                    <div class="forecast__championship">{{$forecast->event()->first()->championship()->first()->name}}</div>
                                    <div class="forecast__teams">{{$forecast->title}}</div>
                                    <div class="forecast__forecast">Прогноз: {{$forecast->coefficient()->first()->type}}</div>
                                    <div class="forecast__coefficient">Кф. {{$forecast->coefficient()->first()->coefficient}}</div>
                                    <div class="forecast__coefficient">Ставка:  {{$forecast->bet}} xB</div>
                                    <div class="forecast__start">Начало игры: ({{$forecast->event->start}})</div>
                                </div>
                            </div>
                        </div>
                    </div>
                @empty
                @endforelse
                <button id="show_more" class="front-page-main__allForecasts" style="width: 100%;">Показать больше</button>
            </div>
        </div>
    </section>
@endsection