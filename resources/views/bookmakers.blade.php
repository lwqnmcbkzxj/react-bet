@extends('layouts.app')

@section('head')
    <title>Betting HUB — Букмекеры</title>
@endsection

@section('content')
    <div class="wrapper">
        <ul class="breadcrumbs">
            <li><a href="{{route('page.index')}}">Главная</a></li>
            <li>Букмекеры</li>
        </ul>
    </div>

    <section class="bookmakers">
        <div class="wrapper">
            <h1 class="bookmakers__title">Букмекеры</h1>
            <div class="bookmakers__box">
                @forelse($bookmakers as $bookmaker)
                    <div class="bookmakers__item">
                        <img src="{{$bookmaker->image}}" class="bookmakers__img" alt="">
                        <div class="bookmakers__col">
                            <h3 class="bookmakers__itemTitle">{{$bookmaker->title}}</h3>
                            <div class="bookmakers__stars">{{$bookmaker->rating}}</div>
                        </div>
                        @isset($bookmaker->bonus)
                            <div class="bookmakers__col bookmakers__col_bonus">
                                <h3 class="bookmakers__itemTitle">Бонус:</h3>
                                <span class="bookmakers__money">{{$bookmaker->bonus}}</span>
                            </div>
                        @endisset
                        <div class="bookmakers__btns">
                            <a href="{{route('bookmakers.show', $bookmaker)}}" class="bookmakers__full">Обзор</a>
                            @isset($bookmaker->external_reference)
                                <a href="{{$bookmaker->external_reference}}" class="bookmakers__site">Перейти на сайт</a>
                            @endisset
                        </div>
                    </div>
                @empty
                @endforelse
            </div>
        </div>
    </section>
@endsection