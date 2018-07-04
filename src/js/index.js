/**
 * jQuery is not included as default. Please enable jQuery in config.js
 * if you wanna use jQuery.
 */
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
  return function( elem ) {
      return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
  };
});

/* ---------------------------
    Ripple Effect Native JS
--------------------------- */

Element.prototype.rippleEffect = (e) => {
  let self;
  let size;
  let spanEl;
  let rippleX;
  let rippleY;
  let offsetX;
  let offsetY;
  let eWidth;
  let eHeight;

  const btn = Object.prototype.hasOwnProperty.call(e, 'disabled') || e.classList.contains('disabled') ? false : e;

  btn.addEventListener('mousedown', (ev) => {
    self = e;
    // Disable right click
    if (e.button === 2) {
      return false;
    }

    let rippleFlag = 0;
    for (let i = 0; i < self.childNodes.length; i += 1) {
      if (self.childNodes[i].nodeType === Node.ELEMENT_NODE) {
        if (self.childNodes[i].matches('.ripple')) rippleFlag += 1;
      }
    }

    if (rippleFlag === 0) {
      const elChild = document.createElement('span');
      elChild.classList.add('ripple');
      self.insertBefore(elChild, self.firstChild);
    }
    [spanEl] = self.querySelectorAll('.ripple');
    spanEl.classList.remove('animated');

    eWidth = self.getBoundingClientRect().width;
    eHeight = self.getBoundingClientRect().height;
    size = Math.max(eWidth, eHeight);

    spanEl.style.width = `${size}px`;
    spanEl.style.height = `${size}px`;

    offsetX = self.ownerDocument.defaultView.pageXOffset;
    offsetY = self.ownerDocument.defaultView.pageYOffset;

    rippleX = parseInt(ev.pageX - (self.getBoundingClientRect().left + offsetX), 10) - (size / 2);
    rippleY = parseInt(ev.pageY - (self.getBoundingClientRect().top + offsetY), 10) - (size / 2);

    spanEl.style.top = `${rippleY}px`;
    spanEl.style.left = `${rippleX}px`;
    spanEl.classList.add('animated');

    setTimeout(() => {
      spanEl.remove();
    }, 800);

    return ev;
  });
};

const rippleEl = document.querySelectorAll('.ripple-effect');
for (let i = 0; i < rippleEl.length; i += 1) {
  rippleEl[i].rippleEffect(rippleEl[i]);
}

const isOnViewport = (element) => {
  const windowTop = window.scrollY;
  const windowBottom = window.scrollY + window.innerHeight;

  const elemTop = element.offsetTop;
  const elemBottom = elemTop + element.offsetHeight;

  return (elemTop >= windowTop) && (elemBottom <= windowBottom);
};

const initPivot = () => {
  const pivotDelay = 200;
  const overlay = document.getElementsByClassName('overlay')[0];
  const pivotContainer = document.getElementsByClassName('pivot-container')[0];
  const pivotButton = document.querySelectorAll('.pivot-button, .pivot-container');

  let pivotEnterTimeout;
  let pivotLeaveTimeout;

  pivotButton.forEach((elem) => {
    elem.addEventListener('mouseenter', () => {
      clearTimeout(pivotLeaveTimeout);

      pivotEnterTimeout = setTimeout(() => {
        pivotContainer.classList.add('pivot-container--active');
        overlay.style.display = 'block';
      }, pivotDelay);
    });

    elem.addEventListener('mouseleave', () => {
      clearTimeout(pivotEnterTimeout);

      pivotLeaveTimeout = setTimeout(() => {
        pivotContainer.classList.remove('pivot-container--active');
        overlay.style.display = 'none';
      }, pivotDelay);
    });
  });
};

const gtmImpression = (dataLayer) => {
  const gtmElement = document.querySelectorAll('[data-impression]:not(.viewed)');

  gtmElement.forEach((elem) => {
    if (isOnViewport(elem)) {
      dataLayer.push(JSON.parse(elem.getAttribute('data-impression')));
      elem.classList.add('viewed');
    }
  });
};

const initGtmClickListener = (dataLayer) => {
  document.body.addEventListener('click', (event) => {
    if (event.target.matches('a[data-click]')) {
      const gtmProps = JSON.parse(event.target.getAttribute('data-click'));
      const targetUrl = event.target.getAttribute('href');

      gtmProps.eventCallback = () => {
        document.location = targetUrl;
      };

      dataLayer.push(gtmProps);
    }
  });
};

window.onload = () => {
  const dataLayer = window.dataLayer || [];

  initPivot();
  initGtmClickListener(dataLayer);

  gtmImpression(dataLayer);

  window.onscroll = () => {
    gtmImpression(dataLayer);
  };

  // $('.unify-banner').height($('.unify-banner').width() * 0.0988023952);

  $('*[data-copy]').click(function(){
    var stringHTML = $(this).parent().html().replace('<div class="components-copy-btn" data-copy="">Copy Code</div>', '');
    $("#copy-code").val(stringHTML);
    $("#copy-code").select();
    document.execCommand("copy");
  });

  $('*[data-click-to-expand]').each(function(){
    $(this).css("cursor", "pointer");
  });
  
  $('*[data-click-to-expand]').each(function(){
    $(this).closest('.unify-card').find('*[data-expandable-view]').css({
      height: $(this).attr('data-click-to-expand'),
      overflowY: 'scroll',
    });
  });

  $('*[data-click-to-expand]').click(function(){
    $(this).closest('.unify-card').find('.expandable').slideToggle(100);
  });

  $('*[data-click-to-expand-button]').click(function(){
    if($(this).closest('.unify-card').find('.expandable').is(':hidden')){
      $(this).text('Collapse');
    }else{
      $(this).text('Expand');
    }
    $(this).closest('.unify-card').find('.expandable').slideToggle(100);
  });

  $('#error-input-example').on('input',function(){
    if($(this).val() != "") {
      $(this).attr('error','true');
      $(this).next().children().first().removeClass('unify-form-input__info--hidden');
      $(this).closest('.unify-form-input__container').find('.unify-form-input__label').addClass('unify-form-input__label--error');
    }else {
      $(this).removeAttr('error');
      $(this).next().children().first().addClass('unify-form-input__info--hidden');
      $(this).closest('.unify-form-input__container').find('.unify-form-input__label').removeClass('unify-form-input__label--error');
    }
  });

  if($('.unify-tab-tabs').length) {
    $('.unify-tab-thumb').each(function() {
      $(this).width($(this).siblings('.unify-tab').first().outerWidth());
    });

    $('.unify-tab').click(function() {
      $(this).closest('.unify-tab-tabs').find('.unify-tab').removeClass('unify-tab__active');
      $(this).addClass('unify-tab__active');
      const left = $(this).position().left;
      const width = $(this).outerWidth();
      const index = $(this).index();
      const contentWrapper = $(this).closest('.unify-tab__container').siblings('.unify-tab__content-wrapper');
      $(this).siblings('.unify-tab-thumb').css({'left': left, 'width': width});
      contentWrapper.height(contentWrapper.height());
      contentWrapper.children().fadeOut(150, function() {contentWrapper.css('height', 'auto');});
      contentWrapper.children().eq(index).css('paddingTop', 30);
      contentWrapper.children().eq(index).delay(150).animate({'opacity': 'show', 'paddingTop': 0}, 700);
    });
  }

  $('.unify-dropdown-container li').hover(function() {
    $(this).siblings('.dropdown-indicator').css({
      'top': $(this).position().top,
      'height': $(this).outerHeight()
    });
  });

  $('.unify-dropdown-container').on('click', 'li', function(event) {
    let value = $(this).text();
    $(this).closest('.unify-relative').find('input').val(value);
  });

  $('.unify-dropdown-container').mouseleave(function() {
    $(this).find('.dropdown-indicator').fadeOut(150);
  });

  $('.unify-dropdown-container').mouseenter(function() {
    $(this).find('.dropdown-indicator').fadeIn(150);
  });

  $('*[dropdown-menu]').focus(function() {
    $(this).siblings('.unify-dropdown-icon').css({
      transform: 'translateY(calc(-50% + 5px)) rotate(-45deg)',
      borderColor: '#8BC582',
    })
    $(this).siblings('.unify-dropdown-container').slideDown({
      duration: 600,
      easing: 'easeInOutExpo'
    });
    $(this).siblings('.unify-dropdown-container').find('ul').css({'marginTop': 1000, 'opacity': 0});
    $(this).siblings('.unify-dropdown-container').find('ul').each(function() {
      // $(this).animate({'opacity': 'show'}, 1000);
      $(this).animate({'marginTop': 0, 'opacity': 1}, 500, 'easeOutQuint');
    });
  });

  $('.unify-dropdown-icon').click(function() {
    $(this).siblings('input').focus();
  });

  $('*[dropdown-menu]').on('input', function(){
    $(this).siblings('.unify-dropdown-container').find('li').hide();
    $(this).siblings('.unify-dropdown-container').find('li:contains('+$(this).val()+')').show();
  });

  $('*[dropdown-menu]').blur(function() {
    $(this).siblings('.unify-dropdown-container').delay(200).slideUp(200);
    $(this).siblings('.unify-dropdown-icon').css({
      transform: 'translateY(-50%) rotate(135deg)',
      borderColor: '',
    })
  });

  $('.unify-navigation ul li').click(function() {
    $('.unify-navigation ul li').removeClass('active');
    $(this).addClass('active');
  });

  //unify 
  
};
