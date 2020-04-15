@extends('layouts.app')

@section('head')
    <title>Betting HUB — Новости</title>
    <meta name="robots" content="noindex">
@endsection

@section('content')

    <section class="articles">
        <div class="wrapper">
            <ul class="breadcrumbs">
                <li><a href="{{route('page.index')}}">Главная</a></li>
                <li>Новости</li>
            </ul>

            @forelse($news as $post)
                <div class="articles__item">
                    <!--                    <img src="--><?php //the_post_thumbnail_url('full') ?><!--" alt="" class="articles__img">-->
                    <div class="articles__col">
                        <a href="{{$post->link}}" target="_blank" class="articles__title">{{$post->title}}</a>
                        <p>{{$post->content}}</p>
                        <span class="articles__date">{{$post->created_at}}</span>
                    </div>
                </div>
            @empty
            @endforelse

            {{$news->links()}}
        </div>
    </section>

@endsection