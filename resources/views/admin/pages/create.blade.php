@extends('admin.layouts.app')

@section('content')

    <div class="container">
        @component('admin.components.breadcrumbs')
            @slot('title') Создание новой страницы @endslot
            @slot('parent') Главная @endslot
            @slot('active') Создание новой страницы @endslot
        @endcomponent

        <hr>
        <form action="{{route('admin.page.store')}}" method="post" enctype="multipart/form-data">
            {{csrf_field()}}

            {{-- Form include --}}
            @include('admin.pages.partials.form')
        </form>

    </div>

@endsection