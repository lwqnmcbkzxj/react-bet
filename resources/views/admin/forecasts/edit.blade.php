@extends('admin.layouts.app')

@section('content')

    <div class="container">
        @component('admin.components.breadcrumbs')
            @slot('title') Редактирование прогноза @endslot
            @slot('parent') Главная @endslot
            @slot('active') Прогноз @endslot
        @endcomponent

        <hr>

        <form action="{{route('admin.forecasts.update', $forecast)}}" method="post" enctype="multipart/form-data">
            <input type="hidden" name="_method" value="put">
            {{csrf_field()}}

            {{-- Form include --}}
            @include('admin.forecasts.partials.form')
        </form>

    </div>

@endsection