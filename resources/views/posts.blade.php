@extends('layouts.app')

@section('head')
    <title>Betting HUB — Статьи</title>
@endsection

@section('content')

<section class="articles">
    <div class="wrapper">
        <ul class="breadcrumbs">
            <li><a href="{{route('page.index')}}">Главная</a></li>
            <li>Статьи</li>
        </ul>

        @forelse($posts as $post)

        <div class="articles__item">
            @isset($post->preview)
                <img src="{{$post->preview ?? ''}}" alt="" class="articles__img">
            @endisset
            <div class="articles__col">
                <a href="{{route('posts.show', $post)}}" class="articles__title mb-3">{{$post->title}}</a>
                <span class="articles__date">{{$post->created_at}}</span>
            </div>
        </div>

        @empty
        @endforelse


        {{$posts->links()}}

    </div>
</section>

@endsection