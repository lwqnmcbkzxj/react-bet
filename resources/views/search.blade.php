@extends('layouts.app')

@section('head')
    <title>Betting HUB — Поиск</title>
@endsection

@section('content')
    <section class="about">
        <div class="wrapper">
            <ul class="breadcrumbs">
                <li><a href="{{route('page.index')}}">Главная</a></li>
                <li>Поиск</li>
            </ul>
            @forelse($posts as $post)
            <div class="articles__item">
                <div class="articles__col">
                    <a href="{{route('posts.show', $post)}}" target="_blank" class="articles__title mb-3">{{$post->title}}</a>
                    <span class="articles__date">{{$post->created_at}}</span>
                </div>
            </div>
            @empty
            @endforelse
            @isset($error)
                <p>{{$error}}</p>
            @endisset
        </div>
    </section>
@endsection