'use strict';

(function () {
  var onError = function (errorMessage) {
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var mainElement = document.querySelector('main');
    var errorElement = errorTemplate.cloneNode(true);
    var errorButtonElement = errorElement.querySelector('.error__button');

    errorElement.querySelector('p').textContent = errorMessage;
    mainElement.appendChild(errorElement);
    var onErrorMessageRemove = function () {
      errorElement.remove();
      document.removeEventListener('click', onErrorMessageRemove);
    };

    document.addEventListener('click', onErrorMessageRemove);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE && errorElement) {
        onErrorMessageRemove();
      }
    });
    errorButtonElement.addEventListener('click', onErrorMessageRemove);
  };

  var onSuccessSave = function () {
    var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
    var mainElement = document.querySelector('main');
    var successElement = successTemplate.cloneNode(true);

    var onSuccessMessageRemove = function () {
      successElement.remove();
      document.removeEventListener('click', onSuccessMessageRemove);
    };

    mainElement.appendChild(successElement);

    document.addEventListener('click', onSuccessMessageRemove);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE && successElement) {
        onSuccessMessageRemove();
      }
    });
  };

  window.userMsg = {
    onError: onError,
    onSuccessSave: onSuccessSave
  };

})();
