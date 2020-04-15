<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>


    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Font awesome -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- Styles -->
    <link href="{{ asset('css/app.min.css') }}" rel="stylesheet">
</head>
<body>
<div id="app">
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="{{ route('admin.index') }}">
                {{ config('app.name', 'Laravel') }}
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Left Side Of Navbar -->
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a href="{{route('admin.index')}}" class="nav-link">Панель состояния</a>
                    </li>
                    @if(Auth::user()->role_id === 4 || Auth::user()->role_id === 5)
                        <li class="nav-item">
                            <a href="{{route('admin.users.index')}}" class="nav-link">Пользователи</a>
                        </li>
                    @endif
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Спорт</a>
                        <div class="dropdown-menu">
                            <a href="{{route('admin.forecasts.index')}}" class="dropdown-item">Прогнозы</a>
                            <a href="{{route('admin.events.index')}}" class="dropdown-item">События</a>
                            <a href="{{route('admin.championships.index')}}" class="dropdown-item">Чемпионаты</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a href="{{route('admin.posts.index')}}" class="nav-link">Статьи</a>
                    </li>
                    <li class="nav-item">
                        <a href="{{route('admin.bookmakers.index')}}" class="nav-link">Букмекеры</a>
                    </li>
                    @if(Auth::user()->role_id === 4 || Auth::user()->role_id === 5)
                        <li class="nav-item">
                            <a href="{{route('admin.menu.index')}}" class="nav-link">Меню</a>
                        </li>
                    @endif
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Страницы</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="{{route('admin.page.create')}}">Создать новую страницу</a>
                            @forelse(\App\Page::all() as $page)
                            <a class="dropdown-item" href="{{route('admin.page.edit', $page)}}">{{$page->title}}</a>
                            @empty
                            @endforelse
                        </div>
                    </li>
                    @if(Auth::user()->role_id === 4 || Auth::user()->role_id === 5)
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Еще</a>
                        <div class="dropdown-menu">
                            <a href="{{route('admin.banners.index')}}" class="dropdown-item">Баннеры</a>
                            <a href="{{route('admin.options')}}" class="dropdown-item">Опции</a>
                        </div>
                    </li>
                    @endif
                </ul>

                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto">
                    <!-- Authentication Links -->
                    @guest
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                        </li>
                        @if (Route::has('register'))
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                            </li>
                        @endif
                    @else
                        <li class="nav-item dropdown">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                {{ Auth::user()->login }} <span class="caret"></span>
                            </a>

                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="{{ route('logout') }}"
                                   onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                    {{ __('Выйти') }}
                                </a>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                    @csrf
                                </form>
                            </div>
                        </li>
                    @endguest
                </ul>
            </div>
        </div>
    </nav>
    <main class="py-4">
        @yield('content')
    </main>
</div>


<!-- Scripts -->
<script src="{{ asset('ckeditor/ckeditor.js') }}"></script>
<script src="{{ asset('js/app.min.js') }}"></script>
<script defer>
    $(document).ready(function () {
        CKEDITOR.replace( 'content', {
            filebrowserUploadUrl: "{{route('upload', ['_token' => csrf_token() ])}}",
            filebrowserUploadMethod: 'form'
        });
    });
</script>
</body>
</html>