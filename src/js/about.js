$(document).ready(function() {
    $('.images__item').mouseenter(function() {
        $(this).find('.images__item-overlay').fadeIn(400);
    });

    $('.images__item').mouseleave(function() {
        $(this).find('.images__item-overlay').fadeOut(400);
    });
});