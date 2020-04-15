$('#feedback__form').on('submit', function (e) {
    e.preventDefault();

    let url = '/api/feedback/send';

    let userEmail = $(this).parent().find('input[name=user_email]').val();
    let message = $(this).parent().find('textarea[name=message]').val();

    let formData = new FormData();
    formData.append( 'user_email', userEmail);
    formData.append( 'message', message);

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
            if (response === 200) {
                alert('Сообщение успешно отправлено');
                $('input[name=user_email]').val('');
                $('textarea[name=message]').val('');
            } else {
                console.log(response);
            }
        }
    });
});