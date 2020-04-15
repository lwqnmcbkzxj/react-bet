@extends('admin.layouts.app')

@section('content')

    <div class="container">
        @component('admin.components.breadcrumbs')
            @slot('title') Редактирование события @endslot
            @slot('parent') Главная @endslot
            @slot('active') Событие @endslot
        @endcomponent

        <hr>

        <form action="{{route('admin.events.update', $event)}}" method="post" enctype="multipart/form-data">
            <input type="hidden" name="_method" value="put">
            {{csrf_field()}}

            {{-- Form include --}}
            @include('admin.events.partials.form')
        </form>

    </div>

@endsection