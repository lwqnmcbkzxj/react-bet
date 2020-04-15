@extends('layouts.app')

@section('head')
    <title>{{$post->meta_title}}</title>
    <meta name="description" content="{{$post->meta_description}}">
    <meta name="keywords" content="{{$post->meta_keywords}}">
    @if($post->meta_noindex)
        <meta name="robots" content="noindex">
    @endif
@endsection

@section('content')
<section class="bookmakers-single">
    <div class="wrapper">
        <ul class="breadcrumbs">
            <li><a href="{{route('page.index')}}">Главная</a></li>
            <li><a href="{{route('page.posts')}}">Статьи</a></li>
            <li>{{$post->title}}</li>
        </ul>

        <h1 class="bookmakers-single__title">{{$post->title}}</h1>
        @php
            echo $post->content;
        @endphp
    </div>
</section>
@endsection