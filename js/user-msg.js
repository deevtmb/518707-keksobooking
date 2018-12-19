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
    var removeErrorMessage = function () {
      errorElement.remove();
      document.removeEventListener('click', removeErrorMessage);
    };

    document.addEventListener('click', removeErrorMessage);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE && errorElement) {
        removeErrorMessage();
      }
    });
    errorButtonElement.addEventListener('click', removeErrorMessage);
  };

  var onSuccessSave = function () {
    var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
    var mainElement = document.querySelector('main');
    var successElement = successTemplate.cloneNode(true);

    var removeSuccessMessage = function () {
      successElement.remove();
      document.removeEventListener('click', removeSuccessMessage);
    };

    mainElement.appendChild(successElement);

    document.addEventListener('click', removeSuccessMessage);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE && successElement) {
        removeSuccessMessage();
      }
    });
  };

  window.userMsg = {
    onError: onError,
    onSuccessSave: onSuccessSave
  };

})();
