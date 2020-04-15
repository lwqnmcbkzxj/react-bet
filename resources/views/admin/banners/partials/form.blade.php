<label for="">Статус</label>
<select name="status" id="" class="form-control mb-3">
        @isset($banner->id)
                <option value="1" @if($banner->status === 1) selected @endif>Активный</option>
                <option value="0" @if($banner->status === 0) selected @endif>Не активный</option>
        @else
                <option value="1">Активный</option>
                <option value="0">Не активный</option>
        @endif
</select>

<label for="">Позиция</label>
<select name="position" id="" class="form-control mb-3">
        @isset($banner->position)
                <option value="full" @if($banner->position === 'full') selected @endif>Полноэкранный</option>
                <option value="bottom" @if($banner->position === 'bottom') selected @endif>Нижний</option>
        @else
                <option value="full">Полноэкранный</option>
                <option value="bottom">Нижний</option>
        @endif
</select>

<label for="">Тип</label>
<select name="is_video" class="form-control mb-3" id="">
    @isset($banner->is_video)
        <option value="0" @if($banner->is_video === false) selected @endif>Изображение</option>
        <option value="1" @if($banner->is_video === true) selected @endif>Видео</option>
    @else
        <option value="0">Изображение</option>
        <option value="1">Видео</option>
    @endif
</select>

<label for="">Название</label>
<input type="text" name="title" placeholder="Название" value="{{$banner->title ?? ''}}" class="form-control mb-3">

<label for="">Ссылка</label>
<input type="text" name="link" placeholder="Ссылка" value="{{$banner->link ?? ''}}" class="form-control mb-3">

<label for="">Изображение/Видео</label>
<input type="file" name="image" class="form-control-file mb-3">
@isset($banner->image)
        <div class="jumbotron">
                <img src="{{$banner->image ?? ''}}" alt="">
        </div>
@endisset

<label for="">Задержка перед вызовом (в секундах)</label>
<input type="number" name="delay" value="{{$banner->delay ?? ''}}" placeholder="Задержка перед вызовом" class="form-control mb-3">

<label for="">Перерыв между баннерами (в часах)</label>
<input type="number" name="timeout" value="{{$banner->timeout ?? ''}}" placeholder="Перерыв между баннерами" class="form-control mb-3">



<input class="btn btn-primary mt-3" type="submit" value="Сохранить">