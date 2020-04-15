@extends('admin.layouts.app')

@section('content')
    <div class="container">
        @component('admin.components.breadcrumbs')
            @slot('title') Список событий @endslot
            @slot('parent') Главная @endslot
            @slot('active') События @endslot
        @endcomponent
        <hr>

        <a href="{{route('admin.events.create')}}" class="btn btn-primary pull-right mb-3 d-flex align-items-center">
            <i class="fa fa-plus-square-o mr-1"></i>
            Добавить новое событие
        </a>

        <form action="{{route('admin.events.search')}}" method="get" class="mb-4 d-flex pull-left">
            {{csrf_field()}}
            <input type="text" class="form-control mr-3" placeholder="Поиск по названию" name="s" value="<?php if (request()->has('s')) {echo request()->get('s');} ?>">
            <button type="submit" class="btn btn-primary">Поиск</button>
        </form>

        <table class="table table-striped">
            <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th class="text-right">Действие</th>
            </tr>
            </thead>
            <tbody>
            @forelse($events as $event)
                <tr>
                    <td>{{$event->id}}</td>
                    <td>{{$event->title}}</td>
                    <td>
                        <form class="d-flex justify-content-end"
                              onsubmit="if (confirm('Удалить?')){return true;} else {return false;} " action="{{route('admin.events.destroy', $event)}}" method="post">
                            <input type="hidden" name="_method" value="DELETE">
                            {{csrf_field()}}
                            <a class="btn btn-secondary mr-2"  href="{{route('admin.events.edit', $event)}}">
                                <i class="fa fa-edit"></i>
                            </a>
                            <button type="submit" class="btn"><i class="fa fa-trash-o"></i></button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="3" class="text-center">
                        <h2>Данные отсутствуют</h2>
                    </td>
                </tr>
            @endforelse
            </tbody>
            <tfoot>
            <tr>
                <td colspan="4">
                    <ul class="pagination pull-right">
                        {{$events->appends(request()->input())->links()}}
                    </ul>
                </td>
            </tr>
            </tfoot>
        </table>

    </div>
@endsection