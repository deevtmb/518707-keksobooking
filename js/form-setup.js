'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mapMainPinElement = document.querySelector('.map__pin--main');
  var formElement = document.querySelector('.ad-form');
  var formFieldsetElements = formElement.querySelectorAll('fieldset');
  var resetButtonElement = formElement.querySelector('.ad-form__reset');
  var addressInputElement = formElement.querySelector('#address');

  var mainPinPositionLeft = mapMainPinElement.style.left;
  var mainPinPositionTop = mapMainPinElement.style.top;

  var setAddressValue = function () {
    addressInputElement.value = (mapMainPinElement.offsetLeft + window.utils.MAP_PIN_WIDTH / 2) + ', ' + (mapMainPinElement.offsetTop + window.utils.MAP_PIN_HEIGHT);
  };

  var disableForm = function () {
    if (formElement.classList.contains('ad-form--disabled')) {
      for (var i = 0; i < formFieldsetElements.length; i++) {
        formFieldsetElements[i].setAttribute('disabled', true);
      }
    }
  };

  var enable = function () {
    for (var i = 0; i < formFieldsetElements.length; i++) {
      formFieldsetElements[i].removeAttribute('disabled');
    }
  };

  var setDisableMode = function () {
    var mapPinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var offerCardElement = document.querySelector('.map__card');

    mapElement.classList.add('map--faded');
    formElement.classList.add('ad-form--disabled');
    mapMainPinElement.style.left = mainPinPositionLeft;
    mapMainPinElement.style.top = mainPinPositionTop;

    for (var i = 0; i < mapPinElements.length; i++) {
      mapPinElements[i].remove();
    }
    if (offerCardElement) {
      offerCardElement.remove();
    }

    disableForm();
    formElement.reset();
    setAddressValue();
    window.scrollTo(0, 0);
  };

  var onSuccessSubmit = function () {
    window.userMsg.onSuccessSave();
    setDisableMode();
  };

  window.addEventListener('load', function () {
    disableForm();
    setAddressValue();
  });

  resetButtonElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    setDisableMode();
  });

  window.formSetup = {
    enable: enable,
    onSuccessSubmit: onSuccessSubmit,
    setAddressValue: setAddressValue
  };
})();
