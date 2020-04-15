<label for="">Название</label>
<input type="text" class="form-control mb-3" name="title" placeholder="Название" value="{{$page->title ?? ''}}">

<label for="">Содержание</label>
<textarea class="form-control mb-3" name="content" placeholder="Содержание">{{$page->content ?? ''}}</textarea>

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

<input class="btn btn-primary mt-3" type="submit" value="Сохранить">