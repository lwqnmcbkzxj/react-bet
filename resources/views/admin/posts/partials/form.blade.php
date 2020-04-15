<label for="">Название</label>
<input required type="text" class="form-control mb-3" name="title" placeholder="Название" value="{{$post->title ?? ''}}">

<label for="">Содержание статьи</label>
<textarea  required class="form-control mb-3" name="content" placeholder="Содержание статьи">{{$post->content ?? ''}}</textarea>

<label for="">Превью</label>
<input type="file" class="form-control-file mb-3" name="preview">
@isset($post->preview)
    <div class="jumbotron">
        <img src="{{$post->preview ?? ''}}" alt="">
    </div>
@endisset

<label for="">Мета-заголовок</label>
<input type="text" class="form-control mb-3" name="meta_title" placeholder="Мета-заголовок" value="{{$post->meta_title ?? ''}}">

<label for="">Мета-описание</label>
<input type="text" class="form-control mb-3" name="meta_description" placeholder="Мета-описание" value="{{$post->meta_description ?? ''}}">

<label for="">Мета-ключевые слова</label>
<input type="text" class="form-control mb-3" name="meta_keywords" placeholder="Мета-ключевые слова" value="{{$post->meta_keywords ?? ''}}">

<div class="form-check">
    <input type="checkbox" class="form-check-input" id="meta_noindex" name="meta_noindex" @if($post->meta_noindex ?? '') checked @endif>
    <label class="form-check-label" for="meta_noindex">Не индексировать</label>
</div>

<div class="form-check">
    <input type="checkbox" class="form-check-input" id="is_published" name="is_published" @if($post->is_published ?? '') checked @endif>
    <label class="form-check-label" for="is_published">Опубликована?</label>
</div>

<input class="btn btn-primary mt-3" type="submit" value="Сохранить">