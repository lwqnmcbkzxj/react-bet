@extends('layouts.app')

@section('head')
    <title>{{$page->meta_title}}</title>
    <meta name="description" content="{{$page->meta_description}}">
    <meta name="keywords" content="{{$page->meta_keywords}}">
    @if($page->meta_noindex)
        <meta name="robots" content="noindex">
    @endif
@endsection

@section('content')
    <section class="about">
        <div class="wrapper">
            <ul class="breadcrumbs">
                <li><a href="{{route('page.index')}}">Главная</a></li>
                <li>{{$page->title}}</li>
            </ul>
            @php
                echo $page->content
            @endphp
        </div>
    </section>
@endsection