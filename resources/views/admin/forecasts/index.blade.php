@extends('admin.layouts.app')

@section('content')
    <div class="container">
        @component('admin.components.breadcrumbs')
            @slot('title') Список прогнозов @endslot
            @slot('parent') Главная @endslot
            @slot('active') Прогнозы @endslot
        @endcomponent
        <hr>

        <a href="{{route('admin.forecasts.create')}}" class="btn btn-primary pull-right mb-3 d-flex align-items-center">
            <i class="fa fa-plus-square-o mr-1"></i>
            Добавить новый прогноз
        </a>

        <form action="{{route('admin.forecasts.search')}}" method="get" class="mb-4 d-flex pull-left">
            {{csrf_field()}}
            <input type="text" class="form-control mr-3" placeholder="Поиск по событию" name="s" value="<?php if (request()->has('s')) {echo request()->get('s');} ?>">
            <button type="submit" class="btn btn-primary">Поиск</button>
        </form>

        <table class="table table-striped">
            <thead>
            <tr>
                <th>ID</th>
                <th>Прогноз от</th>
                <th>Статус</th>
                <th class="text-right">Действие</th>
            </tr>
            </thead>
            <tbody>
            @forelse($forecasts as $forecast)
                <tr>
                    <td>{{$forecast->id}}</td>
                    <td>{{$forecast->user()->first()->login}}</td>
                    <td>
                        @if($forecast->coefficient()->first()->status === 1)
                            <span class="text-secondary">Ожидание</span>
                        @elseif($forecast->coefficient()->first()->status === 2)
                            <span class="text-success">Прошла</span>
                        @elseif($forecast->coefficient()->first()->status === 3)
                            <span class="text-danger">Не прошла</span>
                        @endif
                    </td>
                    <td>
                        <form class="d-flex justify-content-end"
                              onsubmit="if (confirm('Удалить?')){return true;} else {return false;} " action="{{route('admin.forecasts.destroy', $forecast)}}" method="post">
                            <input type="hidden" name="_method" value="DELETE">
                            {{csrf_field()}}
                            <a class="btn btn-secondary mr-2"  href="{{route('admin.forecasts.edit', $forecast)}}">
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
                        {{$forecasts->appends(request()->input())->links()}}
                    </ul>
                </td>
            </tr>
            </tfoot>
        </table>

    </div>
@endsection