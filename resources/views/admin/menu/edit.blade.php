@extends('admin.layouts.app')

@section('content')

    <div class="container">
        @component('admin.components.breadcrumbs')
            @slot('title') Редактирование пункта меню @endslot
            @slot('parent') Главная @endslot
            @slot('active') Редактирование пункта меню @endslot
        @endcomponent

        <hr>

        <form action="{{route('admin.menu.update', $menu)}}" method="post" enctype="multipart/form-data">
            <input type="hidden" name="_method" value="put">
            {{csrf_field()}}

            {{-- Form include --}}
            @include('admin.menu.partials.form')

        </form>

    </div>

@endsection