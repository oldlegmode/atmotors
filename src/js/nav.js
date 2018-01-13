(function () {
  'use strict'

  var linkNav = document.querySelectorAll('.header__nav-link');
  var speedScroll = 0.25; // скорость, может иметь дробное значение через точку
  var bloksCoordsObject = {};

  writeBlocksCoords(linkNav);

  toggleActiveLinkOnScroll();

  for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function(e) {
      e.preventDefault();
      
      scrollToBlock(this);
    }, false);
    linkNav[i].addEventListener('click', function (event) {
      removeActive(linkNav);

      var link = event.target;

      link.classList.add('header__nav-link--active');
    });
  }

  function scrollToBlock(link) {
    var pageYOffset = window.pageYOffset, // прокрутка
      hash = link.href.replace(/[^#]*(.*)/, '$1'), // id элемента, к которому нужно перейти
      indent = document.querySelector(hash).getBoundingClientRect().top, // отступ от окна браузера до id
      start = null;
    requestAnimationFrame(step); // подробнее про функцию анимации [developer.mozilla.org]
    
    function step(time) {
      if (start === null) start = time;
      var progress = time - start,
          delta = (indent < 0 
            ? Math.max(pageYOffset - progress / speedScroll, pageYOffset + indent) 
            : Math.min(pageYOffset + progress / speedScroll, pageYOffset + indent));
      window.scrollTo(0, delta);
      if (delta != pageYOffset + indent) {
        requestAnimationFrame(step);
      } else {
        // location.hash = hash // URL с хэшем
      }
    }
  }

  function toggleActiveLinkOnScroll() {
    var self = this;

    window.addEventListener('scroll', function (e) {
      whatBlockIsActive.apply(self);
    })
  }

  function whatBlockIsActive() {
    for (var key in bloksCoordsObject) {
      if (isBlockActive(bloksCoordsObject[key])) {
        removeActive(linkNav);
        toggleLink(key);
        return;
      }
    }
  }

  function toggleLink(key) {
    for (var i = 0; i < linkNav.length; i++ ) {
      if ( ~linkNav[i].href.indexOf(key) ) {
        linkNav[i].classList.add('header__nav-link--active');
      }
    }
  }

  function isBlockActive(block) {
    if (pageYOffset + 64 > block.top && pageYOffset + 63 <= block.bottom) {
      return true;
    }
    return false;
  }

  function writeBlocksCoords(links) {
    for (var i = 0, key = ''; i < links.length; i++) {
      key = links[i].href.split('#')[1];
      bloksCoordsObject[key] = getCoords(document.getElementById(key));
    }
  }

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      bottom: box.bottom + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  function removeActive(links) {
   for (var i = 0; i < links.length; i++) {
     links[i].classList.remove('header__nav-link--active');  
   }
  }

})(window, document);