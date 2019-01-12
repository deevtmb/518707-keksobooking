'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var LOW_PRICE = 10000;
  var MIDDLE_PRICE = 50000;

  var mapFiltersElement = document.querySelector('.map__filters');
  var housingPriceElement = mapFiltersElement.querySelector('#housing-price');
  var housingTypeElement = mapFiltersElement.querySelector('#housing-type');
  var housingRoomElement = mapFiltersElement.querySelector('#housing-rooms');
  var housingGuestElement = mapFiltersElement.querySelector('#housing-guests');
  var wifiFeatureElement = mapFiltersElement.querySelector('#filter-wifi');
  var dishwasherFeatureElement = mapFiltersElement.querySelector('#filter-dishwasher');
  var parkingFeatureElement = mapFiltersElement.querySelector('#filter-parking');
  var washerFeatureElement = mapFiltersElement.querySelector('#filter-washer');
  var elevatorFeatureElement = mapFiltersElement.querySelector('#filter-elevator');
  var conditionerFeatureElement = mapFiltersElement.querySelector('#filter-conditioner');
  var lastTimeout;

  var debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  var removeOffers = function () {
    var offerElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    Array.from(offerElements).forEach(function (element) {
      element.remove();
    });
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
        return housingTypeElement.value !== 'any' ? it.offer.type === housingTypeElement.value : true;
      })
      .filter(function (it) {
        return housingRoomElement.value !== 'any' ? it.offer.rooms === parseInt(housingRoomElement.value, 10) : true;
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
        return wifiFeatureElement.checked ? it.offer.features.includes(wifiFeatureElement.value) : true;
      })
      .filter(function (it) {
        return dishwasherFeatureElement.checked ? it.offer.features.includes(dishwasherFeatureElement.value) : true;
      })
      .filter(function (it) {
        return parkingFeatureElement.checked ? it.offer.features.includes(parkingFeatureElement.value) : true;
      })
      .filter(function (it) {
        return washerFeatureElement.checked ? it.offer.features.includes(washerFeatureElement.value) : true;
      })
      .filter(function (it) {
        return elevatorFeatureElement.checked ? it.offer.features.includes(elevatorFeatureElement.value) : true;
      })
      .filter(function (it) {
        return conditionerFeatureElement.checked ? it.offer.features.includes(conditionerFeatureElement.value) : true;
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
