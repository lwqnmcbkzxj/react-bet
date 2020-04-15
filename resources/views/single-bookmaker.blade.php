@extends('layouts.app')

@section('head')
    <title>{{$bookmaker->meta_title}}</title>
    <meta name="description" content="{{$bookmaker->meta_description}}">
    <meta name="keywords" content="{{$bookmaker->meta_keywords}}">
    @if($bookmaker->meta_noindex)
        <meta name="robots" content="noindex">
    @endif
@endsection

@section('content')
    <section class="bookmakers-single">
        <div class="wrapper">
            <ul class="breadcrumbs">
                <li><a href="{{route('page.index')}}">Главная</a></li>
                <li><a href="{{route('page.bookmakers')}}">Букмекеры</a></li>
                <li>{{$bookmaker->title}}</li>
            </ul>

            <h1 class="bookmakers-single__title">{{$bookmaker->title}}</h1>
            @php
                echo $bookmaker->content;
            @endphp
        </div>
    </section>
@endsection