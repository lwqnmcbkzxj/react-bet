$(window).on('load', function () {
    $('body').addClass('loaded_hiding');
    window.setTimeout(function () {
        $('body').addClass('loaded');
        $('body').removeClass('loaded_hiding');
    }, 500);
});