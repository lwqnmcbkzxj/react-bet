@extends('admin.layouts.app')

@section('content')

    <div class="container">
        @component('admin.components.breadcrumbs')
            @slot('title') Создание события @endslot
            @slot('parent') Главная @endslot
            @slot('active') Событие @endslot
        @endcomponent

        <hr>

        <form action="{{route('admin.events.store')}}" method="post" enctype="multipart/form-data">
            {{csrf_field()}}

            {{-- Form include --}}
            @include('admin.events.partials.form')
        </form>

    </div>

@endsection