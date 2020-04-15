let bannerDelay = $('.adfull').attr('data-delay');
let bannerTimeout = $(".adfull").attr('data-timeout');

if (bannerDelay) {
    setTimeout(function () {
        $('.banner__box').fadeIn();
    }, bannerDelay * 1000);

}

let footerBannerDelay = $('#adFooter').attr('data-delay');
let footerBannerTimeout = $('#adFooter').attr('data-timeout');

if ($(window).width() < 768) {
    if (footerBannerDelay) {
        setTimeout(function () {
            $('.footer-banner__box').fadeIn();
        }, footerBannerDelay * 1000);

    }
}


$('.banner__box i').on('click', function () {
    $(this).parent().fadeOut();
    setCookie('banners_timeout', 'true', bannerTimeout);
});

$('.footer-banner__box i').on('click', function () {
    $(this).parent().fadeOut();
    setCookie('footer_banner_timeout', 'true', footerBannerTimeout);
});

function setCookie(name,value,hours) {
    var expires = "";
    if (hours) {
        var date = new Date();
        date.setTime(date.getTime() + (hours*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}