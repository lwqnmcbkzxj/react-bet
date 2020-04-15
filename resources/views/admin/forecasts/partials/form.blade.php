<label for="status">Статус</label>
<select name="status" id="status" class="form-control mb-3">
    @isset($forecast->id)
        <option value="1" @if($forecast->coefficient()->first()->status === 1) selected @endif>Ставка еще не сыграла</option>
        <option value="2" @if($forecast->coefficient()->first()->status === 2) selected @endif>Ставка прошла</option>
        <option value="3" @if($forecast->coefficient()->first()->status === 3) selected @endif>Ставка не прошла</option>
        <option value="0" @if($forecast->coefficient()->first()->status === 0) selected @endif>Возврат ставки</option>
    @else
        <option value="1">Ставка еще не сыграла</option>
        <option value="2">Ставка прошла</option>
        <option value="3">Ставка не прошла</option>
        <option value="0">Возврат ставки</option>
    @endisset
</select>

<label for="users">Прогноз от</label>
<select name="user_id" id="users" class="form-control mb-3">
    @forelse($users as $user)
        @isset($forecast->id)
            @if($user->id === $forecast->user()->first()->id)
                <option value="{{$user->id}}" selected>{{$user->login}}</option>
                @continue
            @endif
        @endisset
        <option value="{{$user->id}}">{{$user->login}}</option>
    @empty
    @endforelse
</select>

<label class="mt-3" for="">Содержание</label>
<textarea name="forecast" id="" class="form-control mb-3" placeholder="Содержание прогноза" rows="7">{{$forecast->forecast ?? ''}}</textarea>

<label for="">Ставка</label>
<input required name="bet" type="number" step="0.01" class="form-control mb-3" placeholder="Ставка" value="{{$forecast->bet ?? ''}}">

<label for="">Исход</label>
<input required type="text" class="form-control mb-3" name="type" value="@isset($forecast->id){{$forecast->coefficient()->first()->type ?? ''}}@endisset">

<label for="">Коэффициент</label>
<input required type="number" step="0.01" class="form-control mb-3" name="coefficient" value="@isset($forecast->id){{$forecast->coefficient()->first()->coefficient ?? ''}}@endisset">

<label for="">Дата создания</label>
<input type="text" name="created_at" class="form-control mb-3" placeholder="гггг-мм-дд чч:мм:cc" required value="{{$forecast->created_at ?? ''}}">

<label for="event">Событие</label>
<select name="event_id" id="event" class="form-control mb-3">
    @forelse($events as $event)
        @isset($forecast->id)
            @if($event->id === $forecast->event()->first()->id)
                <option value="{{$event->id}}" selected>{{$event->title}}</option>
                @continue
            @endif
        @endisset
        <option value="{{$event->id}}">{{$event->title}}</option>
    @empty
    @endforelse
</select>

@isset($forecast->id)
    @if($forecast->coefficient()->first()->status === 1)
        <div class="alert alert-warning mt-3" role="alert">
            Ставка еще не сыграла
            <br>
            Возможный выигрыш: <span class="font-weight-bold">{{$forecast->bet * $forecast->coefficient()->first()->coefficient}}</span>
        </div>
    @elseif($forecast->coefficient()->first()->status === 2)
        <div class="alert alert-success mt-3" role="alert">
            Ставка прошла
            <br>
            Итог: <span class="font-weight-bold">+{{$forecast->bet * $forecast->coefficient()->first()->coefficient}}</span>
        </div>
    @elseif($forecast->coefficient()->first()->status === 3)
        <div class="alert alert-danger mt-3" role="alert">
            Ставка не прошла
            <br>
            Итог: <span class="font-weight-bold">-{{$forecast->bet}}</span>
        </div>
    @endif
@endisset

<input class="btn btn-primary mt-3" type="submit" value="Сохранить">