(function() {
  'use strict'

  var portfolioGallery = document.querySelector('.portfolio__gallery-content');
  var images = [];
  var close = document.querySelector('.gallery__close');
  var gallery = document.querySelector('.gallery');
  var toggleBtn = document.querySelectorAll('.gallery__toggle');
  var index = 0;

  portfolioGallery.addEventListener('click', showGallery);
  close.addEventListener('click', closeGallery);
  fillImagesArray();
  addClassToImges('gallery__img');
  for (var i = 0; i < toggleBtn.length; i++) {
    toggleBtn[i].addEventListener('click', toggleImg);
  }

  function fillImagesArray() {
    for (var i = 0; i < portfolioGallery.children.length; i++) {
      images.push(portfolioGallery.children[i].firstElementChild.cloneNode(true));
    }
  }

  function addClassToImges(className) {
    images.forEach(function (img) {
      img.classList.add(className);
    })
  }

  function pasteIntoHtml(img) {
    gallery.appendChild(img);
  }

  function toggleImg(e) {
    if ( e.target.classList.contains('gallery__toggle--next') ) {
      nextImgShow();
      return;
    }
    prevImgShow()
  }

  function nextImgShow() {
    index = (index + 1) % 9;
    removeImgFromGallery();
    addImgToGallery(images[index]);
    showSign(images[index]);
    
  }

  function prevImgShow() {
    index = (index - 1) % 9 === -1 ? 8 : (index - 1) % 9;
    removeImgFromGallery();
    addImgToGallery(images[index]);
    showSign(images[index]);
  }

  function removeImgFromGallery() {
    gallery.removeChild(gallery.querySelector('img'));
  }

  function closeGallery(event) {
    removeImgFromGallery();
    event.target.parentElement.style.display = 'none';
  }

  function addImgToGallery(element) {
    try {
      gallery.appendChild(element);
    } catch (e) {
      console.error(e);
    }
  }

  function showSign(element) {
    var sign = gallery.querySelector('.gallery__sign');

    sign.textContent = element.alt;
  }

  function showGallery(e) {
    e.preventDefault();
    var target = e.target;

    while(target.tagName !== 'A') {
      target = target.parentElement;
      if (target.tagName !== 'A' || target.tagName === 'IMG') return;
    }
    gallery.style.display = 'block';
    index = getIndex(target);
    addImgToGallery(images[index]);
  }

  function getIndex(link) {
    var links = portfolioGallery.querySelectorAll('.portfolio__gallery-link');

    for (var i = 0; i < links.length; i++) {
      if ( link === links[i] ) return i;
    }
    return 0;
  }

})(window, document)