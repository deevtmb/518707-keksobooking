'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

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
        if (housingPriceElement.value === 'any') {
          return it.offer.price > 0;
        } else if (housingPriceElement.value === 'low') {
          return it.offer.price <= 10000;
        } else if (housingPriceElement.value === 'middle') {
          return it.offer.price >= 10000 && it.offer.price <= 50000;
        } else {
          return it.offer.price >= 50000;
        }
      })
      .filter(function (it) {
        if (housingTypeElement.value !== 'any') {
          return it.offer.type === housingTypeElement.value;
        } else {
          return true;
        }
      })
      .filter(function (it) {
        if (housingRoomElement.value !== 'any') {
          return it.offer.rooms === parseInt(housingRoomElement.value, 10);
        } else {
          return true;
        }
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
        } else {
          return true;
        }
      })
      .filter(function (it) {
        if (dishwasherFeatureElement.checked) {
          return it.offer.features.includes(dishwasherFeatureElement.value);
        } else {
          return true;
        }
      })
      .filter(function (it) {
        if (parkingFeatureElement.checked) {
          return it.offer.features.includes(parkingFeatureElement.value);
        } else {
          return true;
        }
      })
      .filter(function (it) {
        if (washerFeatureElement.checked) {
          return it.offer.features.includes(washerFeatureElement.value);
        } else {
          return true;
        }
      })
      .filter(function (it) {
        if (elevatorFeatureElement.checked) {
          return it.offer.features.includes(elevatorFeatureElement.value);
        } else {
          return true;
        }
      })
      .filter(function (it) {
        if (conditionerFeatureElement.checked) {
          return it.offer.features.includes(conditionerFeatureElement.value);
        } else {
          return true;
        }
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
  wifiFeatureElement.addEventListener('input', function () {
    debounce(onMapFiltersChange);
  });
  dishwasherFeatureElement.addEventListener('input', function () {
    debounce(onMapFiltersChange);
  });
  parkingFeatureElement.addEventListener('input', function () {
    debounce(onMapFiltersChange);
  });
  washerFeatureElement.addEventListener('input', function () {
    debounce(onMapFiltersChange);
  });
  elevatorFeatureElement.addEventListener('input', function () {
    debounce(onMapFiltersChange);
  });
  conditionerFeatureElement.addEventListener('input', function () {
    debounce(onMapFiltersChange);
  });
})();
