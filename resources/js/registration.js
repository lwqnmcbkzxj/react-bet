$('#registration-btn').on('click', function (e) {
    e.preventDefault();

    let url = '/wp-json/api/v1/registration';

    let userLogin = $(this).parent().find('input[name=user_login]').val();
    let userEmail = $(this).parent().find('input[name=user_email]').val();
    let userPassword = $(this).parent().find('input[name=user_password]').val();

    let formData = new FormData();
    formData.append( 'user_login', userLogin);
    formData.append( 'user_email', userEmail);
    formData.append( 'user_password', userPassword);

    $.ajax({
        url: url,
        contentType: false, // важно - убираем форматирование данных по умолчанию
        processData: false, // важно - убираем преобразование строк по умолчанию
        method: "POST",
        dataType: 'json', // тип ожидаемых данных в ответе
        data: formData,
        success: function (response) {
            response = JSON.parse(response);
            console.log(response);
            if (!response.error) {
                document.location.replace('/');
            }
            else {
                $('#registration-error').html(response.error);
            }
        }
    });
});

$('#header-auth').on('click', function () {
   $('.overlay').fadeIn();
   $('.popup').fadeIn().css('display', 'flex');
});

$('.popup__cross').on('click', function () {
   $('.overlay').fadeOut();
   $('.popup').fadeOut();
});