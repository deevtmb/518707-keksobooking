'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var LOW_PRICE = 10000;
  var MIDDLE_PRICE = 50000;

  var housingPriceElement = document.querySelector('#housing-price');
  var housingTypeElement = document.querySelector('#housing-type');
  var housingRoomElement = document.querySelector('#housing-rooms');
  var housingGuestElement = document.querySelector('#housing-guests');
  var wifiFeatureElement = document.querySelector('#filter-wifi');
  var dishwasherFeatureElement = document.querySelector('#filter-dishwasher');
  var parkingFeatureElement = document.querySelector('#filter-parking');
  var washerFeatureElement = document.querySelector('#filter-washer');
  var elevatorFeatureElement = document.querySelector('#filter-elevator');
  var conditionerFeatureElement = document.querySelector('#filter-conditioner');
  var lastTimeout;

  var debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  var removeOffers = function () {
    var offerElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < offerElements.length; i++) {
      offerElements[i].remove();
    }
  };

  var onMapFiltersChange = function () {
    var cardElement = document.querySelector('.map__card');

    var filteredOffers = window.offersMap
      .filter(function (it) {
        if (housingPriceElement.value === 'high') {
          return it.offer.price >= MIDDLE_PRICE;
        } else if (housingPriceElement.value === 'low') {
          return it.offer.price <= LOW_PRICE;
        } else if (housingPriceElement.value === 'middle') {
          return it.offer.price >= LOW_PRICE && it.offer.price <= MIDDLE_PRICE;
        } else {
          return true;
        }
      })
      .filter(function (it) {
        if (housingTypeElement.value !== 'any') {
          return it.offer.type === housingTypeElement.value;
        }
        return true;
      })
      .filter(function (it) {
        if (housingRoomElement.value !== 'any') {
          return it.offer.rooms === parseInt(housingRoomElement.value, 10);
        }
        return true;
      })
      .filter(function (it) {
        if (housingGuestElement.value === '1' || housingGuestElement.value === '2') {
          return it.offer.guests >= parseInt(housingGuestElement.value, 10);
        } else if (housingGuestElement.value === '0') {
          return it.offer.guests === parseInt(housingGuestElement.value, 10);
        } else {
          return true;
        }
      })
      .filter(function (it) {
        if (wifiFeatureElement.checked) {
          return it.offer.features.includes(wifiFeatureElement.value);
        }
        return true;
      })
      .filter(function (it) {
        if (dishwasherFeatureElement.checked) {
          return it.offer.features.includes(dishwasherFeatureElement.value);
        }
        return true;
      })
      .filter(function (it) {
        if (parkingFeatureElement.checked) {
          return it.offer.features.includes(parkingFeatureElement.value);
        }
        return true;
      })
      .filter(function (it) {
        if (washerFeatureElement.checked) {
          return it.offer.features.includes(washerFeatureElement.value);
        }
        return true;
      })
      .filter(function (it) {
        if (elevatorFeatureElement.checked) {
          return it.offer.features.includes(elevatorFeatureElement.value);
        }
        return true;
      })
      .filter(function (it) {
        if (conditionerFeatureElement.checked) {
          return it.offer.features.includes(conditionerFeatureElement.value);
        }
        return true;
      });

    if (cardElement) {
      cardElement.remove();
    }
    removeOffers();
    window.renderPins(filteredOffers);
  };

  housingTypeElement.addEventListener('input', function () {
    debounce(onMapFiltersChange);
  });
  housingPriceElement.addEventListener('input', function () {
    debounce(onMapFiltersChange);
  });
  housingRoomElement.addEventListener('input', function () {
    debounce(onMapFiltersChange);
  });
  housingGuestElement.addEventListener('input', function () {
    debounce(onMapFiltersChange);
  });
  wifiFeatureElement.addEventListener('change', function () {
    debounce(onMapFiltersChange);
  });
  dishwasherFeatureElement.addEventListener('change', function () {
    debounce(onMapFiltersChange);
  });
  parkingFeatureElement.addEventListener('change', function () {
    debounce(onMapFiltersChange);
  });
  washerFeatureElement.addEventListener('change', function () {
    debounce(onMapFiltersChange);
  });
  elevatorFeatureElement.addEventListener('change', function () {
    debounce(onMapFiltersChange);
  });
  conditionerFeatureElement.addEventListener('change', function () {
    debounce(onMapFiltersChange);
  });
})();
