'use strict';

(function () {
  var SUCCESS_STATUS = 200;

  var Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    SAVE: 'https://js.dump.academy/keksobooking'
  };

  var xhr;

  var createNewXhr = function (onLoad, onError, errorText) {
    xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError(errorText + ': ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });
  };

  var load = function (onLoad, onError) {
    createNewXhr(onLoad, onError, 'Ошибка загрузки объявлений');

    xhr.open('GET', Url.LOAD);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    createNewXhr(onLoad, onError, 'Ошибка отправки формы');

    xhr.open('POST', Url.SAVE);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
