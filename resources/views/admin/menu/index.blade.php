@extends('admin.layouts.app')

@section('content')
    <div class="container">
        @component('admin.components.breadcrumbs')
            @slot('title') Меню @endslot
            @slot('parent') Главная @endslot
            @slot('active') Меню @endslot
        @endcomponent
        <hr>

        <a href="{{route('admin.menu.create')}}" class="btn btn-primary mb-3 d-flex align-items-center pull-right">
            <i class="fa fa-plus-square-o mr-1"></i>
            Добавить новый пункт меню
        </a>

        <h2 class="h2 font-weight-bold mb-3">Верхнее меню</h2>
        <table class="table table-striped">
            <thead>
            <tr>
                <th>ID</th>
                <th>Заголовок</th>
                <th class="text-right">Действие</th>
            </tr>
            </thead>
            <tbody>
            @forelse($top as $item)
                <tr>
                    <td>{{$item->id}}</td>
                    <td>{{$item->title}}</td>
                    <td>
                        <form class="d-flex justify-content-end"
                              onsubmit="if (confirm('Удалить?')){return true;} else {return false;} " action="{{route('admin.menu.destroy', $item)}}" method="post">
                            <input type="hidden" name="_method" value="DELETE">
                            {{csrf_field()}}
                            <a class="btn btn-secondary mr-2"  href="{{route('admin.menu.edit', $item)}}">
                                <i class="fa fa-edit"></i>
                            </a>
                            <button type="submit" class="btn"><i class="fa fa-trash-o"></i></button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" class="text-center">
                        <h2>Данные отсутствуют</h2>
                    </td>
                </tr>
            @endforelse
            </tbody>
        </table>


        <h2 class="h2 font-weight-bold mb-3">Нижнее меню</h2>
        <table class="table table-striped">
            <thead>
            <tr>
                <th>ID</th>
                <th>Заголовок</th>
                <th class="text-right">Действие</th>
            </tr>
            </thead>
            <tbody>
            @forelse($footer as $item)
                <tr>
                    <td>{{$item->id}}</td>
                    <td>{{$item->title}}</td>
                    <td>
                        <form class="d-flex justify-content-end"
                              onsubmit="if (confirm('Удалить?')){return true;} else {return false;} " action="{{route('admin.menu.destroy', $item)}}" method="post">
                            <input type="hidden" name="_method" value="DELETE">
                            {{csrf_field()}}
                            <a class="btn btn-secondary mr-2"  href="{{route('admin.menu.edit', $item)}}">
                                <i class="fa fa-edit"></i>
                            </a>
                            <button type="submit" class="btn"><i class="fa fa-trash-o"></i></button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" class="text-center">
                        <h2>Данные отсутствуют</h2>
                    </td>
                </tr>
            @endforelse
            </tbody>
        </table>
    </div>
@endsection