@extends('admin.layouts.app')

@section('content')

    <div class="container">
        @component('admin.components.breadcrumbs')
            @slot('title') Редактирование Статьи @endslot
            @slot('parent') Главная @endslot
            @slot('active') Статья @endslot
        @endcomponent

        <hr>

        <form action="{{route('admin.posts.update', $post)}}" method="post" enctype="multipart/form-data">
            <input type="hidden" name="_method" value="put">
            {{csrf_field()}}

            {{-- Form include --}}
            @include('admin.posts.partials.form')

            <input type="hidden" name="modified_by" value="{{Auth::id()}}">
        </form>

    </div>

@endsection