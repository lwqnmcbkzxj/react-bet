$(".hamburger").on('click', function () {
    $('.header__nav').slideToggle();
});

$(window).resize(function () {
   if ($(window).width() > 1250)  {
       $('.header__nav').css('display', 'flex');
   }
   else {
       $('.header__nav').css('display', 'none');
   }
});

jQuery(".forecast__content").each(function(){
    var review_full = jQuery(this).html();
    var review = review_full;

    if( review.length > 500 )
    {
        review = review.substring(0, 500);
        jQuery(this).html( review + '<div class="read_more"> Читать полностью</div>' );
    }
    jQuery(this).append('<div class="full_text" style="display: none;">' + review_full + '</div>');
});

jQuery(".read_more").click(function(){
    jQuery(this).parent().html( jQuery(this).parent().find(".full_text").html() );
});

$('.forecast__cogs').on('click', function () {
   $('.forecast__mobileFilter').slideToggle();
});

$('.header__login').on('click', function () {
    $(".header__dropdown").slideToggle();
});