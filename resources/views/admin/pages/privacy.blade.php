@extends('admin.layouts.app')

@section('content')

    <div class="container">
        @component('admin.components.breadcrumbs')
            @slot('title') Редактирование страницы {{$page->title ?? ''}} @endslot
            @slot('parent') Главная @endslot
            @slot('active') {{$page->title ?? ''}} @endslot
        @endcomponent

        <hr>
        <form action="{{route('admin.privacy.update', ['page' => $page])}}" method="post" enctype="multipart/form-data">
            <input type="hidden" name="_method" value="put">
            {{csrf_field()}}

            {{-- Form include --}}
            @include('admin.pages.partials.form')
        </form>

    </div>

@endsection