@extends('admin.layouts.app')

@section('content')

    <div class="container">
        @component('admin.components.breadcrumbs')
            @slot('title') Редактирование пользователя @endslot
            @slot('parent') Главная @endslot
            @slot('active') Редактирование пользователя @endslot
        @endcomponent

        <hr>

        <form action="{{route('admin.users.update', $user)}}" method="post" enctype="multipart/form-data">
            <input type="hidden" name="_method" value="put">
            {{csrf_field()}}

            {{-- Form include --}}
            @include('admin.users.partials.form')

        </form>

    </div>

@endsection