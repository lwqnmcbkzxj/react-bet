@extends('admin.layouts.app')

@section('content')

    <div class="container">
        @component('admin.components.breadcrumbs')
            @slot('title') Редактирование букмекера @endslot
            @slot('parent') Главная @endslot
            @slot('active') Букмекер @endslot
        @endcomponent

        <hr>

        <form action="{{route('admin.bookmakers.update', $bookmaker)}}" method="post" enctype="multipart/form-data">
            <input type="hidden" name="_method" value="put">
            {{csrf_field()}}

            {{-- Form include --}}
            @include('admin.bookmakers.partials.form')

            <input type="hidden" name="modified_by" value="{{Auth::id()}}">
        </form>

    </div>

@endsection