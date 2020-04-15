@extends('admin.layouts.app')

@section('content')

    <div class="container">
        @component('admin.components.breadcrumbs')
            @slot('title') Создание прогноза @endslot
            @slot('parent') Главная @endslot
            @slot('active') Создание прогноза @endslot
        @endcomponent

        <hr>

        <form action="{{route('admin.forecasts.store')}}" method="post" enctype="multipart/form-data">
            {{csrf_field()}}

            {{-- Form include --}}
            @include('admin.forecasts.partials.form')
        </form>

    </div>

@endsection