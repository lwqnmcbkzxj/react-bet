<label for="status">Статус</label>
<select name="status" id="status" class="form-control mb-3">
    @isset($event->id)
        <option value="1" @if($event->status === 1) selected @endif>Событие не завершено</option>
        <option value="2" @if($event->status === 2) selected @endif>Событие завершено</option>
    @else
        <option value="1">Событие не завершено</option>
        <option value="2">Событие завершено</option>
    @endisset
</select>

<label for="">Название</label>
<input required name="title" type="text" class="form-control mb-3" placeholder="Название" value="{{$event->title ?? ''}}">

<label for="championship_id">Чемпионат</label>
<select name="championship_id" id="championship_id" class="form-control mb-3 admin-select">
    @forelse($championships as $championship)
        @isset($event->id)
            @if($championship->id === $event->championship()->first()->id)
                <option value="{{$championship->id}}" selected>{{$championship->name}}</option>
                @continue
            @endif
        @endisset
        <option value="{{$championship->id}}">{{$championship->name}}</option>
    @empty
    @endforelse
</select>

<label class="mt-3" for="sport_id">Вид спорта</label>
<select name="sport_id" id="sport_id" class="form-control mb-3 admin-select">
    @forelse($sports as $sport)
        @isset($event->id)
            @if($sport->id === $event->sport()->first()->id)
                <option value="{{$sport->id}}" selected>{{$sport->name}}</option>
                @continue
            @endif
        @endisset
        <option value="{{$sport->id}}">{{$sport->name}}</option>
    @empty
    @endforelse
</select>

<label class="mt-3" for="">Дата начала</label>
<input type="text" name="start" class="form-control mb-3" placeholder="гггг-мм-дд чч:мм:cc" required value="{{$event->start ?? ''}}">

@error('start')
        <div class="alert alert-danger mt-2">{{ $message }}</div>
@enderror

<input class="btn btn-primary mt-3" type="submit" value="Сохранить">