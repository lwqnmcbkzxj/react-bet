@extends('admin.layouts.app')

@section('content')

    <div class="container">
        @component('admin.components.breadcrumbs')
            @slot('title') Редактирование баннера @endslot
            @slot('parent') Главная @endslot
            @slot('active') Баннер @endslot
        @endcomponent

        <hr>

        <form action="{{route('admin.banners.update', $banner)}}" method="post" enctype="multipart/form-data">
            <input type="hidden" name="_method" value="put">
            {{csrf_field()}}

            {{-- Form include --}}
            @include('admin.banners.partials.form')
        </form>

    </div>

@endsection