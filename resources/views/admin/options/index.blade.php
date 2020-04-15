@extends('admin.layouts.app')

@section('content')
    <div class="container">
        <form action="{{route('admin.options.update')}}" method="post" enctype="multipart/form-data">
            {{csrf_field()}}
            @forelse($options as $option)
                @if($option->type === 'string')
                    <label for="">{{$option->label}}</label>
                    <input type="text" name="{{$option->key}}" value="{{$option->value ?? ''}}" placeholder="{{$option->label}}" class="form-control mb-3">
                @elseif($option->type === 'textarea')
                    <label for="">{{$option->label}}</label>
                    <textarea rows="5" name="{{$option->key}}" placeholder="{{$option->label}}" class="form-control mb-3">{{$option->value ?? ''}}</textarea>
                @elseif($option->type === 'checkbox')
                    <div class="form-check-label">
                        <input type="checkbox" name="{{$option->key}}" @if($option->value === 'on') checked @endif>
                        <label for="">{{$option->label}}</label>
                    </div>
                @elseif($option->type === 'image')
                    <label for="">{{$option->label}}</label>
                    <input type="file" class="form-control-file mb-3" name="{{$option->key}}">
                    @if($option->value)
                        <img src="{{asset($option->value)}}" alt="" class="d-block mb-3">
                    @endif
                @endif
            @empty
            @endforelse
            <button type="submit" class="btn btn-success">Обновить</button>
        </form>
    </div>
@endsection