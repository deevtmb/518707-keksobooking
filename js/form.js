'use strict';

(function () {
  var TIME_12 = '12:00';
  var TIME_13 = '13:00';
  var TIME_14 = '14:00';
  var BUNGALO_MIN_PRICE = 0;
  var BUNGALO_PLACEHOLDER_PRICE = 500;
  var FLAT_MIN_PRICE = 1000;
  var FLAT_PLACEHOLDER_PRICE = 5000;
  var HOUSE_MIN_PRICE = 5000;
  var HOUSE_PLACEHOLDER_PRICE = 8000;
  var PALACE_MIN_PRICE = 10000;
  var PALACE_PLACEHOLDER_PRICE = 50000;

  var mapPinMainElement = document.querySelector('.map__pin--main');
  var formElement = document.querySelector('.ad-form');
  var formFieldsetElements = formElement.querySelectorAll('fieldset');
  var checkinInputElement = formElement.querySelector('#timein');
  var checkoutInputElement = formElement.querySelector('#timeout');
  var housingTypeElement = formElement.querySelector('#type');
  var housingPriceElement = formElement.querySelector('#price');
  var roomNumberElement = formElement.querySelector('#room_number');
  var guestCapacityElement = formElement.querySelector('#capacity');
  var submitButtonElement = formElement.querySelector('.ad-form__submit');
  var resetButtonElement = formElement.querySelector('.ad-form__reset');
  var addressInputElement = formElement.querySelector('#address');

  var setAddressValue = function () {
    addressInputElement.value = (mapPinMainElement.offsetLeft + window.utils.MAP_PIN_WIDTH / 2) + ', ' + (mapPinMainElement.offsetTop + window.utils.MAP_PIN_HEIGHT);
  };

  var setElementsValueEquality = function (element1, element2) {
    if (element1.value === TIME_12) {
      element2.value = TIME_12;
    } else if (element1.value === TIME_13) {
      element2.value = TIME_13;
    } if (element1.value === TIME_14) {
      element2.value = TIME_14;
    }
  };

  var setAccommodationPrice = function () {
    if (housingTypeElement.value === 'bungalo') {
      housingPriceElement.min = BUNGALO_MIN_PRICE;
      housingPriceElement.placeholder = BUNGALO_PLACEHOLDER_PRICE;
    } else if (housingTypeElement.value === 'flat') {
      housingPriceElement.min = FLAT_MIN_PRICE;
      housingPriceElement.placeholder = FLAT_PLACEHOLDER_PRICE;
    } else if (housingTypeElement.value === 'house') {
      housingPriceElement.min = HOUSE_MIN_PRICE;
      housingPriceElement.placeholder = HOUSE_PLACEHOLDER_PRICE;
    } else if (housingTypeElement.value === 'palace') {
      housingPriceElement.min = PALACE_MIN_PRICE;
      housingPriceElement.placeholder = PALACE_PLACEHOLDER_PRICE;
    }
  };

  var checkGuestNumber = function () {
    submitButtonElement.addEventListener('click', function () {
      if (roomNumberElement.value === '1' && guestCapacityElement.value !== '1') {
        guestCapacityElement.setCustomValidity('Одна комната - Один гость');
      } else if (roomNumberElement.value === '2' && guestCapacityElement.value !== '1' && guestCapacityElement.value !== '2') {
        guestCapacityElement.setCustomValidity('Две комнаты - Один или Два гостя');
      } else if (roomNumberElement.value === '3' && guestCapacityElement.value === '0') {
        guestCapacityElement.setCustomValidity('Выберите количество гостей');
      } else if (roomNumberElement.value === '100' && guestCapacityElement.value !== '0') {
        guestCapacityElement.setCustomValidity('Сто комнат - не для гостей');
      } else {
        guestCapacityElement.setCustomValidity('');
        formElement.submit();
      }
    });
  };

  var setValidationListeners = function () {
    checkinInputElement.addEventListener('input', function () {
      setElementsValueEquality(checkinInputElement, checkoutInputElement);
    });

    checkoutInputElement.addEventListener('input', function () {
      setElementsValueEquality(checkoutInputElement, checkinInputElement);
    });

    housingTypeElement.addEventListener('input', setAccommodationPrice);

    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      checkGuestNumber();
    });
  };

  window.addEventListener('load', function () {
    disableForm();
    setAddressValue();
  });

  var disableForm = function () {
    if (formElement.classList.contains('ad-form--disabled')) {
      for (var i = 0; i < formFieldsetElements.length; i++) {
        formFieldsetElements[i].setAttribute('disabled', true);
      }
    }
  };

  var enableForm = function () {
    for (var i = 0; i < formFieldsetElements.length; i++) {
      formFieldsetElements[i].removeAttribute('disabled');
    }
  };

  resetButtonElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    formElement.reset();
    setAddressValue();
  });

  setValidationListeners();

  window.form = {
    enableForm: function () {
      enableForm();
    },
    setAddressValue: function () {
      setAddressValue();
    }
  };
})();
