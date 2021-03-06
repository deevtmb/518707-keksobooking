'use strict';

(function () {
  var Time = {
    VALUE_12: '12:00',
    VALUE_13: '13:00',
    VALUE_14: '14:00'
  };
  var Price = {
    BUNGALO_MIN: 0,
    BUNGALO_PLACEHOLDER: 500,
    FLAT_MIN: 1000,
    FLAT_PLACEHOLDER: 5000,
    HOUSE_MIN: 5000,
    HOUSE_PLACEHOLDER: 8000,
    PALACE_MIN: 10000,
    PALACE_PLACEHOLDER: 50000
  };

  var formElement = document.querySelector('.ad-form');
  var checkInInputElement = formElement.querySelector('#timein');
  var checkOutInputElement = formElement.querySelector('#timeout');
  var housingTypeElement = formElement.querySelector('#type');
  var housingPriceElement = formElement.querySelector('#price');
  var roomNumberElement = formElement.querySelector('#room_number');
  var guestCapacityElement = formElement.querySelector('#capacity');
  var submitButtonElement = formElement.querySelector('.ad-form__submit');

  var setElementsValueEquality = function (element1, element2) {
    if (element1.value === Time.VALUE_12) {
      element2.value = Time.VALUE_12;
    } else if (element1.value === Time.VALUE_13) {
      element2.value = Time.VALUE_13;
    } if (element1.value === Time.VALUE_14) {
      element2.value = Time.VALUE_14;
    }
  };

  var onAccommodationPriceChange = function () {
    if (housingTypeElement.value === 'bungalo') {
      housingPriceElement.min = Price.BUNGALO_MIN;
      housingPriceElement.placeholder = Price.BUNGALO_PLACEHOLDER;
    } else if (housingTypeElement.value === 'flat') {
      housingPriceElement.min = Price.FLAT_MIN;
      housingPriceElement.placeholder = Price.FLAT_PLACEHOLDER;
    } else if (housingTypeElement.value === 'house') {
      housingPriceElement.min = Price.HOUSE_MIN;
      housingPriceElement.placeholder = Price.HOUSE_PLACEHOLDER;
    } else if (housingTypeElement.value === 'palace') {
      housingPriceElement.min = Price.PALACE_MIN;
      housingPriceElement.placeholder = Price.PALACE_PLACEHOLDER;
    }
  };

  var checkGuestNumber = function () {
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
    }
  };

  var onValidationListeners = function () {
    checkInInputElement.addEventListener('input', function () {
      setElementsValueEquality(checkInInputElement, checkOutInputElement);
    });
    checkOutInputElement.addEventListener('input', function () {
      setElementsValueEquality(checkOutInputElement, checkInInputElement);
    });

    housingTypeElement.addEventListener('input', onAccommodationPriceChange);
    housingPriceElement.addEventListener('input', onAccommodationPriceChange);

    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    submitButtonElement.addEventListener('click', function () {
      checkGuestNumber();
      if (guestCapacityElement.validity.valid && housingPriceElement.validity.valid) {
        window.backend.save(new FormData(formElement), window.formSetup.onSuccessSubmit, window.userMsg.onError);
      }
    });
  };

  onValidationListeners();
})();
