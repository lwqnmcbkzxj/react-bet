@extends('admin.layouts.app')

@section('content')
    <div class="container">
        @component('admin.components.breadcrumbs')
            @slot('title') Список чемпионатов @endslot
            @slot('parent') Главная @endslot
            @slot('active') Чемпионаты @endslot
        @endcomponent
        <hr>

        <a href="{{route('admin.championships.create')}}" class="btn btn-primary pull-right mb-3 d-flex align-items-center">
            <i class="fa fa-plus-square-o mr-1"></i>
            Добавить новый чемпионат
        </a>

        <table class="table table-striped">
            <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th class="text-right">Действие</th>
            </tr>
            </thead>
            <tbody>
            @forelse($championships as $championship)
                <tr>
                    <td>{{$championship->id}}</td>
                    <td>{{$championship->name}}</td>
                    <td>
                        <form class="d-flex justify-content-end"
                              onsubmit="if (confirm('Удалить?')){return true;} else {return false;} " action="{{route('admin.championships.destroy', $championship)}}" method="post">
                            <input type="hidden" name="_method" value="DELETE">
                            {{csrf_field()}}
                            <a class="btn btn-secondary mr-2"  href="{{route('admin.championships.edit', $championship)}}">
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
                        {{$championships->links()}}
                    </ul>
                </td>
            </tr>
            </tfoot>
        </table>

    </div>
@endsection