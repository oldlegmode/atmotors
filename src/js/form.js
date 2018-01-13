;(function(){
  var form = document.getElementById('form');
  var submit = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', sendEmail);

  function sendEmail(e) {
    e.preventDefault();
    
    submit.disabled = 'true'

    ajaxRequest(configForm(form));
    
  }
  function configForm(form) {
    var result = 'УВЕДОМЛЕНИЕ С САЙТА WWW.ATMOTORS.BY\n';

    for (var i = 0; i < form.elements.length - 1; i ++) {
      result = result + form.elements[i].placeholder + ': '
           + form.elements[i].value + '\n';
    }
    return {
      message: result
    };
  }

  function ajaxRequest(data) {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'https://formspree.io/308124@mail.ru', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function() {
      if (this.readyState != 4) return;
      submit.disabled = '';
      if (this.status >= 200 && this.status < 300) {
        alert('Сообщение успешно отправлено!');
        return;
      } else {
        alert('Ошибка: ' + (this.status ? this.statusText : ' отправка не удалась'));
        return;
      }
    }
  }
})(window, document);