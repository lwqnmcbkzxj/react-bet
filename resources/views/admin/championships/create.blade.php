@extends('admin.layouts.app')

@section('content')

    <div class="container">
        @component('admin.components.breadcrumbs')
            @slot('title') Создание чемпионата @endslot
            @slot('parent') Главная @endslot
            @slot('active') Чемпионат @endslot
        @endcomponent

        <hr>

        <form action="{{route('admin.championships.store')}}" method="post" enctype="multipart/form-data">
            {{csrf_field()}}

            {{-- Form include --}}
            @include('admin.championships.partials.form')
        </form>

    </div>

@endsection