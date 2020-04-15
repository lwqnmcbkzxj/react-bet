@extends('admin.layouts.app')

@section('content')

    <div class="container">
        @component('admin.components.breadcrumbs')
            @slot('title') Редактирование чемпионата @endslot
            @slot('parent') Главная @endslot
            @slot('active') Чемпионат @endslot
        @endcomponent

        <hr>

        <form action="{{route('admin.championships.update', $championship)}}" method="post" enctype="multipart/form-data">
            <input type="hidden" name="_method" value="put">
            {{csrf_field()}}

            {{-- Form include --}}
            @include('admin.championships.partials.form')
        </form>

    </div>

@endsection