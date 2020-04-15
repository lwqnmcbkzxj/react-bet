@extends('admin.layouts.app')

@section('content')

    <div class="container">
        @component('admin.components.breadcrumbs')
            @slot('title') Редактирование страницы {{$page->title ?? ''}} @endslot
            @slot('parent') Главная @endslot
            @slot('active') {{$page->title ?? ''}} @endslot
        @endcomponent

        <hr>
        <form action="{{route('admin.page.update', $page)}}" method="post" enctype="multipart/form-data">
            <input type="hidden" name="_method" value="put">
            {{csrf_field()}}

            {{-- Form include --}}
            @include('admin.pages.partials.form')
        </form>

        <form class="mt-2" action="{{route('admin.page.destroy', $page)}}" method="post" onsubmit="if (confirm('Удалить?')){return true;} else {return false;} ">
            <input type="hidden" name="_method" value="DELETE">
            {{csrf_field()}}

            <button type="submit" class="btn btn-danger">Удалить страницу</button>
        </form>

    </div>

@endsection