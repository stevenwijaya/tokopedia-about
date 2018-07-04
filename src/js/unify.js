const breadcrumbOffsetTop = $('.unify-breadcrumb').offset().top;
let breadcrumbActiveIndex = 1;
$('.unify-content').scroll(() => {
  if (breadcrumbActiveIndex < $('.unify-content-wrapper > h1').length) {
    if ($('.unify-content-wrapper > h1').eq(breadcrumbActiveIndex).position().top < 0) {
      $('.unify-breadcrumb li:last-child').text($('.unify-content-wrapper > h1').eq(breadcrumbActiveIndex).text());
      breadcrumbActiveIndex++;
    }
    if (breadcrumbActiveIndex > 1) { 
      if ($('.unify-content-wrapper > h1').eq(breadcrumbActiveIndex - 1).position().top > 0) {
        $('.unify-breadcrumb li:last-child').text($('.unify-content-wrapper > h1').eq(breadcrumbActiveIndex - 2).text());
        breadcrumbActiveIndex--;
      }
    }
  }

  if ($('.unify-content').scrollTop() > breadcrumbOffsetTop) {
    $('.unify-breadcrumb').css({
      position: 'fixed',
      top: 0,
      width: '100%',
      left: 0,
      zIndex: 2,
      background: '#fff',
    });
    $('.unify-banner').css('marginTop', '42px');
  } else {
    $('.unify-breadcrumb').css({
      position: 'static',
    });
    $('.unify-banner').css('marginTop', '0px');
  }
});
