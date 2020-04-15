@extends('admin.layouts.app')

@section('content')

    <div class="container">
        @component('admin.components.breadcrumbs')
            @slot('title') Создание букмекера @endslot
            @slot('parent') Главная @endslot
            @slot('active') Букмекер @endslot
        @endcomponent

        <hr>

        <form action="{{route('admin.bookmakers.store')}}" method="post" enctype="multipart/form-data">
            {{csrf_field()}}

            {{-- Form include --}}
            @include('admin.bookmakers.partials.form')

            <input type="hidden" name="created_by" value="{{Auth::id()}}">
        </form>

    </div>

@endsection