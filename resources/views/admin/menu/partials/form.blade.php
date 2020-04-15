<label for="position">Позиция</label>
<select required name="position" id="position" class="form-control mb-3">
    @isset($menu->id)
        <option value="top" @if ($menu->position === 'top') selected @endif>Шапка</option>
        <option value="footer" @if ($menu->position == 'footer') selected @endif>Футер</option>
    @else
        <option value="top">Шапка</option>
        <option value="footer">Футер</option>
    @endisset
</select>

<label for="title">Название</label>
<input required id="title" type="text" class="form-control mb-3" name="title" placeholder="Название" value="{{$menu->title ?? ''}}">

<label for="path">Страница</label>
<select required name="path" id="path" class="form-control mb-3">
    @isset($menu->id)
        <option value="/" @if($menu->path === '/') selected @endif>Главная</option>
        <option value="/forecasts" @if($menu->path === '/forecasts') selected @endif>Прогнозы</option>
        <option value="/rating" @if($menu->path === '/rating') selected @endif>Рейтинг игроков</option>
        <option value="/posts" @if($menu->path === '/posts') selected @endif>Статьи</option>
        <option value="/news" @if($menu->path === '/news') selected @endif>Новости</option>
        <option value="/bookmakers" @if($menu->path === '/bookmakers') selected @endif>Букмекеры</option>
        <option value="/feedback" @if($menu->path === '/feedback') selected @endif>Обратная связь</option>
        @forelse($pages as $page)
            <option value="/page/{{$page->id}}" @if($menu->path === $page->id) selected @endif>{{$page->title}}</option>
        @empty
        @endforelse
    @else
        <option value="/">Главная</option>
        <option value="/forecasts">Прогнозы</option>
        <option value="/rating">Рейтинг игроков</option>
        <option value="/posts">Статьи</option>
        <option value="/news">Новости</option>
        <option value="/bookmakers">Букмекеры</option>
        <option value="/feedback">Обратная связь</option>
        @forelse($pages as $page)
            <option value="/page/{{$page->id}}">{{$page->title}}</option>
        @empty
        @endforelse
    @endisset
</select>

<label for="sort">Сортировка</label>
<div class="alert alert-dark" role="alert">
    Сортировка происходит по возрастанию
</div>
<input required type="number" name="sort" value="{{$menu->sort ?? ''}}" placeholder="Индекс сортировки" class="form-control mb-3">

<input class="btn btn-primary mt-3" type="submit" value="Сохранить">