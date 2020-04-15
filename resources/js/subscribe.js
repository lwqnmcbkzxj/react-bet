$('#subscribe-btn').on('click', function (e) {
    e.preventDefault();

    let url = '/api/user/subscriptions/update';

    let userID = $(this).parent().find('input[name=user_id]').val();
    let subscribeID = $(this).parent().find('input[name=forecaster_id]').val();

    let formData = new FormData();
    if (userID !== undefined) {
        formData.append( 'user_id', userID);
        formData.append( 'forecaster_id', subscribeID);
    }

    $.ajax({
        url: url,
        contentType: false, // важно - убираем форматирование данных по умолчанию
        processData: false, // важно - убираем преобразование строк по умолчанию
        method: "POST",
        dataType: 'json', // тип ожидаемых данных в ответе
        data: formData,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (response) {
            console.log(response);
            if (response.error) {
                $('.popup').fadeIn().css('display', 'flex');
                $('.overlay').fadeIn();
            }
            else {
                if (response.status === 'subscribe') {
                    $('#subscribe-btn').html('Отписаться').addClass('profile__subscribe_done');

                } else {
                    $('#subscribe-btn').html('Подписаться').removeClass('profile__subscribe_done');
                }
            }
        }
    });
});