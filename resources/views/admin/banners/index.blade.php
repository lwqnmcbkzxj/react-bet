@extends('admin.layouts.app')

@section('content')
    <div class="container">
        @component('admin.components.breadcrumbs')
            @slot('title') Список баннеров @endslot
            @slot('parent') Главная @endslot
            @slot('active') Баннера @endslot
        @endcomponent
        <hr>

        <a href="{{route('admin.banners.create')}}" class="btn btn-primary pull-right mb-3 d-flex align-items-center">
            <i class="fa fa-plus-square-o mr-1"></i>
            Добавить новый баннер
        </a>

        <table class="table table-striped">
            <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Расположение</th>
                <th>Статус</th>
                <th class="text-right">Действие</th>
            </tr>
            </thead>
            <tbody>
            @forelse($banners as $banner)
                <tr>
                    <td>{{$banner->id}}</td>
                    <td>{{$banner->title}}</td>
                    <td>
                        @if($banner->position === 'full')
                            Полноэкранный
                        @elseif($banner->position === 'bottom')
                            Нижний
                        @endif
                    </td>
                    <td>
                        @if($banner->status === 1)
                            <span class="text-success">Опубликован</span>
                        @else
                            <span class="text-danger">Не опубликован</span>
                        @endif
                    </td>
                    <td>
                        <form class="d-flex justify-content-end"
                              onsubmit="if (confirm('Удалить?')){return true;} else {return false;} " action="{{route('admin.banners.destroy', $banner)}}" method="post">
                            <input type="hidden" name="_method" value="DELETE">
                            {{csrf_field()}}
                            <a class="btn btn-secondary mr-2"  href="{{route('admin.banners.edit', $banner)}}">
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
            <tfoot>
            <tr>
                <td colspan="5">
                    <ul class="pagination pull-right">
                        {{$banners->links()}}
                    </ul>
                </td>
            </tr>
            </tfoot>
        </table>

    </div>
@endsection