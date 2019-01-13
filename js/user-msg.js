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

    var onSuccessMessageClick = function () {
      successElement.remove();
      document.removeEventListener('click', onSuccessMessageClick);
    };

    var onSuccessMessageKeydown = function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE && successElement) {
        successElement.remove();
        document.removeEventListener('keydown', onSuccessMessageKeydown);
      }
    };

    mainElement.appendChild(successElement);

    document.addEventListener('click', onSuccessMessageClick);
    document.addEventListener('keydown', onSuccessMessageKeydown);
  };

  window.userMsg = {
    onError: onError,
    onSuccessSave: onSuccessSave
  };

})();
