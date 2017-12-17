;(function(){
  var form = document.getElementById('form');

  form.addEventListener('submit', sendEmail);

  function sendEmail(e) {
    e.preventDefault();

    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'https://formspree.io/ivan.dibil@mail.ru', true);
    // xhr.setRequestHeader('content-type', 'json');
    // xhr.send(JSON.stringify(form));
    // xhr.send({message: "hello!"});
    xhr.send(JSON.stringify({message: "hello!"}));

    xhr.onreadystatechange = function() {
      if (this.readyState != 4) return;
      if (this.status >= 200 && this.status < 300) {
        alert( 'Сообщение успешно отправлено!');
        return;
      }
      if (this.status != 200) {
        // обработать ошибку
        alert( 'Ошибка: ' + (this.status ? this.statusText : ' отправка не удалась') );
        return;
      }
    }
  }
})(window, document);