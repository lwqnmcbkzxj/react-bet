<label for="">Название</label>
<input required name="name" type="text" class="form-control mb-3" placeholder="Название" value="{{$championship->name ?? ''}}">

<label class="mt-3" for="sport_id">Вид спорта</label>
<select name="sport_id" id="sport_id" class="form-control mb-3 admin-select">
    @forelse($sports as $sport)
        @isset($championship->id)
            @if($sport->id === $championship->sport()->first()->id)
                <option value="{{$sport->id}}" selected>{{$sport->name}}</option>
                @continue
            @endif
        @endisset
        <option value="{{$sport->id}}">{{$sport->name}}</option>
    @empty
    @endforelse
</select>

<input class="btn btn-primary mt-3" type="submit" value="Сохранить">