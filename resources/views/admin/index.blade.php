@extends('admin.layouts.app')

@section('content')

    <div class="container">
        <div class="row">
            <div class="col-sm-3">
                <div class="jumbotron">
                    <p class="bg-primary p-3 text-white rounded font-weight-bold">Пользователей: {{$users_count}}</p>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="jumbotron">
                    <p class="bg-primary p-3 text-white rounded font-weight-bold">Прогнозов: {{$forecasts_count}}</p>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="jumbotron">
                    <p class="bg-primary p-3 text-white rounded font-weight-bold">Статей: {{$posts_count}}</p>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="jumbotron">
                    <p class="bg-primary p-3 text-white rounded font-weight-bold">Новостей: {{$news_count}}</p>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="jumbotron">
                    <p class="bg-primary p-3 text-white rounded font-weight-bold">Зарегистрировано за сегодня: {{$users_count_today}}</p>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="jumbotron">
                    <p class="bg-primary p-3 text-white rounded font-weight-bold">Прогнозов за сегодня: {{$forecasts_count_today}}</p>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="jumbotron">
                    <p class="bg-primary p-3 text-white rounded font-weight-bold">Статей за сегодня: {{$posts_count_today}}</p>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="jumbotron">
                    <p class="bg-primary p-3 text-white rounded font-weight-bold">Новостей за сегодня: {{$news_count_today}}</p>
                </div>
            </div>
        </div>
    </div>

@endsection