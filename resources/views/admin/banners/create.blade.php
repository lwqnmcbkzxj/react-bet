@extends('admin.layouts.app')

@section('content')

    <div class="container">
        @component('admin.components.breadcrumbs')
            @slot('title') Создание баннера @endslot
            @slot('parent') Главная @endslot
            @slot('active') Баннер @endslot
        @endcomponent

        <hr>

        <form action="{{route('admin.banners.store')}}" method="post" enctype="multipart/form-data">
            {{csrf_field()}}

            {{-- Form include --}}
            @include('admin.banners.partials.form')
        </form>

    </div>

@endsection