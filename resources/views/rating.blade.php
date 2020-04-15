@extends('layouts.app')

@section('head')
    <title>Betting HUB — Рейтинг прогнозистов</title>
@endsection

@section('content')
    <section class="rating">
        <div class="wrapper">
            <ul class="breadcrumbs">
                <li><a href="{{route('page.index')}}">Главная</a></li>
                <li>Рейтинг игроков</li>
            </ul>
            <div class="front-page-main__head">
                <h1 class="front-page-main__title">

                    Рейтинг игроков
                </h1>
                <ul class="front-page-main__types">
                    <li class="@if(request()->has('time')) active @endif"><a href="{{route('page.rating', ['time' => 'month'])}}">Месяц</a></li>
                    <li class="@if(!request()->has('time')) active @endif"><a href="{{route('page.rating')}}">За все время</a></li>
                </ul>
            </div>
            <div class="rating__box">
                <table class="rating__table">
                    <thead>
                    <tr>
                        <td style="width: 20px;">#</td>
                        <td style="width: 80px;"></td>
                        <td style="width: 200px;">Имя</td>
                        <td>Ставки</td>
                        <td>W/L/D</td>
                        <td>ROI, %</td>
                    </tr>
                    </thead>
                    <tbody>
                        @forelse($users as $index => $user)
                            <tr>
                                <td style="width: 30px;">{{++$index}}</td>
                                <td style="width: 80px;justify-content: flex-end;padding-right: 15px;">
                                    <span class="rating__ava" style="background-image: url({{$user->avatar}});"></span>
                                </td>
                                <td style="width: 200px;"><a href="{{route('users.show', $user->id)}}">{{$user->login}} ({{$user->count_wait}})</a></td>
                                <td>
                                    {{$user->count_forecasts}}
                                </td>
                                <td>
                                    <span class="rating__stat rating__stat_win">
                                        {{$user->count_win}}
                                    </span>
                                    /
                                    <span class="rating__stat rating__stat_lose">
                                        {{$user->count_lose}}
                                    </span>
                                    /
                                    <span class="rating__stat rating__stat_back">
                                        {{$user->count_back}}
                                    </span>
                                </td>
                                <td>
                                    <span class="rating__roi @if($user->roi >= 0) rating__roi_plus @else rating__roi_minus @endif">
                                        @if($user->roi > 0)
                                            +
                                        @endif
                                        {{round($user->roi * 100, 2)}}
                                    </span>
                                </td>
                            </tr>
                        @empty
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </section>
@endsection