<label for="">Название</label>
<input required type="text" class="form-control mb-3" name="title" placeholder="Название" value="{{$bookmaker->title ?? ''}}">

<label for="">Содержание</label>
<textarea  required class="form-control mb-3" name="content" placeholder="Содержание статьи">{{$bookmaker->content ?? ''}}</textarea>

<label for="">Изображение</label>
<input type="file" name="image" class="form-control-file mb-3">
@isset($bookmaker->avatar)
    <div class="jumbotron">
        <img src="{{$bookmaker->image ?? ''}}" alt="">
    </div>
@endisset

<label for="">Рейтинг</label>
<input type="text" class="form-control mb-3" name="rating" placeholder="Рейтинг" value="{{$bookmaker->rating ?? ''}}">

<label for="">Бонус</label>
<input type="text" class="form-control mb-3" name="bonus" placeholder="Бонус" value="{{$bookmaker->bonus ?? ''}}">

<label for="">Внешняя ссылка</label>
<input type="text" class="form-control mb-3" name="external_reference" placeholder="Внешняя ссылка" value="{{$bookmaker->external_reference ?? ''}}">

<label for="">Мета-заголовок</label>
<input type="text" class="form-control mb-3" name="meta_title" placeholder="Мета-заголовок" value="{{$bookmaker->meta_title ?? ''}}">

<label for="">Мета-описание</label>
<input type="text" class="form-control mb-3" name="meta_description" placeholder="Мета-описание" value="{{$bookmaker->meta_description ?? ''}}">

<label for="">Мета-ключевые слова</label>
<input type="text" class="form-control mb-3" name="meta_keywords" placeholder="Мета-ключевые слова" value="{{$bookmaker->meta_keywords ?? ''}}">

<div class="form-check">
    <input type="checkbox" class="form-check-input" id="meta_noindex" name="meta_noindex" @if($bookmaker->meta_noindex ?? '') checked @endif>
    <label class="form-check-label" for="meta_noindex">Не индексировать</label>
</div>

<input class="btn btn-primary mt-3" type="submit" value="Сохранить">