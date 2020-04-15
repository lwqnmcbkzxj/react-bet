@extends('admin.layouts.app')

@section('content')

    <div class="container">
        @component('admin.components.breadcrumbs')
            @slot('title') Создание пункта меню @endslot
            @slot('parent') Главная @endslot
            @slot('active') Создание пункта меню @endslot
        @endcomponent

        <hr>

        <form action="{{route('admin.menu.store')}}" method="post" enctype="multipart/form-data">
            {{csrf_field()}}

            {{-- Form include --}}
            @include('admin.menu.partials.form')
        </form>

    </div>

@endsection