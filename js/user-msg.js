'use strict';

(function () {
  var onError = function (errorMessage) {
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var mainElement = document.querySelector('main');
    var errorElement = errorTemplate.cloneNode(true);

    errorElement.querySelector('p').textContent = errorMessage;
    mainElement.appendChild(errorElement);

    var onErrorMessageClick = function () {
      errorElement.remove();
      document.removeEventListener('click', onErrorMessageClick);
      document.removeEventListener('keydown', onErrorMessageKeydown);
    };

    var onErrorMessageKeydown = function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE && errorElement) {
        errorElement.remove();
        document.removeEventListener('click', onErrorMessageClick);
        document.removeEventListener('keydown', onErrorMessageKeydown);
      }
    };

    document.addEventListener('click', onErrorMessageClick);
    document.addEventListener('keydown', onErrorMessageKeydown);
  };

  var onSuccessSave = function () {
    var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
    var mainElement = document.querySelector('main');
    var successElement = successTemplate.cloneNode(true);

    var onSuccessMessageClick = function () {
      successElement.remove();
      document.removeEventListener('keydown', onSuccessMessageKeydown);
      document.removeEventListener('click', onSuccessMessageClick);
    };

    var onSuccessMessageKeydown = function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE && successElement) {
        successElement.remove();
        document.removeEventListener('keydown', onSuccessMessageKeydown);
        document.removeEventListener('click', onSuccessMessageClick);
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
