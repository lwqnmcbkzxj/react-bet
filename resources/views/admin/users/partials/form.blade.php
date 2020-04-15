<label for="role">Роль</label>
<select name="role_id" id="role" class="form-control mb-3">
    @isset($user->id)
        @if($user->role_id === 5)
            <option value="5" selected disabled>Технический администратор</option>
        @endif
        <option value="1" @if ($user->role_id === 1) selected @endif>Пользователь</option>
        <option value="2" @if ($user->role_id == 2) selected @endif>Робот-прогнозист</option>
        <option value="3" @if ($user->role_id == 3) selected @endif>Модератор</option>
        <option value="4" @if ($user->role_id == 4) selected @endif>Администратор</option>
    @else
        <option value="1">Пользователь</option>
        <option value="2">Робот-прогнозист</option>
        <option value="3">Модератор</option>
        <option value="4">Администратор</option>
    @endisset
</select>

<label for="">Логин</label>
<input type="text" class="form-control mb-3" name="login" placeholder="Логин" value="{{$user->login ?? ''}}">

@error('login')
    <div class="alert alert-danger mt-2">{{ $message }}</div>
@enderror

<label for="">Email</label>
<input type="email" class="form-control mb-3" name="email" placeholder="Email" value="{{$user->email ?? ''}}">

@error('email')
    <div class="alert alert-danger mt-2">{{ $message }}</div>
@enderror

<label for="">Баланс</label>
<input type="number" step="0.01" class="form-control mb-3" name="balance" placeholder="Баланс" value="{{$user->balance ?? ''}}">

<label for="">Платформа</label>
<input type="text" class="form-control mb-3" name="platform" placeholder="Платформа" value="{{$user->platform ?? ''}}">

@isset($user->id)
<label for="">Дата регистрации</label>
<input type="text" value="{{$user->created_at ?? ''}}" class="form-control mb-3" readonly>
@endisset

@isset($user->id)
    @if($user->role_id === 2)
        <label for="">UID (системное поле для парсинга)</label>
        <input type="number" class="form-control mb-3" name="uid" placeholder="uid" value="{{$user->uid ?? ''}}">
    @endif
@else
    <label for="">UID (системное поле для парсинга)</label>
    <input type="number" class="form-control mb-3" name="uid" placeholder="uid" value="{{$user->uid ?? ''}}">
@endisset

<label for="">Аватарка</label>
<input type="file" name="avatar" class="form-control-file mb-3">
@isset($user->avatar)
<div class="jumbotron">
    <img src="{{$user->avatar ?? ''}}" alt="">
</div>
@endisset

<input class="btn btn-primary mt-3" type="submit" value="Сохранить">