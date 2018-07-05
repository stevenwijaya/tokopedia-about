import "./slick.min.js";

(function($) {
    $(function(){
        $('.press-release,.news__container').slick({
            slidesToShow : 1.3,
            infinite:false,
            arrows: false
            
        });
    })
})(jQuery);