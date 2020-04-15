@extends('admin.layouts.app')

@section('content')

    <div class="container">
        @component('admin.components.breadcrumbs')
            @slot('title') Создание статьи @endslot
            @slot('parent') Главная @endslot
            @slot('active') Статья @endslot
        @endcomponent

        <hr>

        <form action="{{route('admin.posts.store')}}" method="post" enctype="multipart/form-data">
            {{csrf_field()}}

            {{-- Form include --}}
            @include('admin.posts.partials.form')

            <input type="hidden" name="created_by" value="{{Auth::id()}}">
        </form>

    </div>

@endsection