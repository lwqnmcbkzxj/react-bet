// $("#personal-submit").on('click', function(e) {
//     e.preventDefault();
//
//     let url = '/wp-json/api/v1/update-personal-data';
//
//     let pushNotification = $(this).parent().find('input[name=push_notification]').is(':checked');
//     let emailNotification = $(this).parent().find('input[name=email_notification]').is(':checked');
//     let userID = $(this).parent().find('input[name=user_id]').val();
//
//     let formData = new FormData();
//     formData.append( 'user_id', userID);
//     formData.append( 'push_notification', pushNotification);
//     formData.append( 'email_notification', emailNotification);
//
//     $.ajax({
//         url: url,
//         contentType: false, // важно - убираем форматирование данных по умолчанию
//         processData: false, // важно - убираем преобразование строк по умолчанию
//         method: "POST",
//         dataType: 'json', // тип ожидаемых данных в ответе
//         data: formData,
//         success: function (response) {
//             response = JSON.parse(response);
//             if (response.success) {
//                 $("#response").html(response.success)
//             }
//         }
//     });
// });
//
// $('#update_user_nicename').on('submit', function(e){
//     e.preventDefault();
//
//     let url = '/wp-json/api/v1/app/update-nicename';
//     let userID = $(this).find('input[name=user_id]').val();
//     let nicename = $(this).find('input[name=nicename]').val();
//
//
//     let formData = new FormData();
//     formData.append( 'user_id', userID);
//     formData.append( 'nicename', nicename);
//
//     $.ajax({
//         url: url,
//         contentType: false, // важно - убираем форматирование данных по умолчанию
//         processData: false, // важно - убираем преобразование строк по умолчанию
//         method: "POST",
//         dataType: 'json', // тип ожидаемых данных в ответе
//         data: formData,
//         success: function (response) {
//             response = JSON.parse(response);
//             if (response.success) {
//                 $("#response-nicename").html(response.success);
//                 $('.header__login').html(nicename);
//             }
//             else if(response.error) {
//                 $("#response-nicename").html(response.error);
//             }
//         }
//     });
// });