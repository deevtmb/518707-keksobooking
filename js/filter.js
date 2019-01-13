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

  var filterPrice = function (element) {
    if (housingPriceElement.value === 'high') {
      return element.offer.price >= MIDDLE_PRICE;
    } else if (housingPriceElement.value === 'low') {
      return element.offer.price <= LOW_PRICE;
    } else if (housingPriceElement.value === 'middle') {
      return element.offer.price >= LOW_PRICE && element.offer.price <= MIDDLE_PRICE;
    } else {
      return true;
    }
  };

  var filterType = function (element) {
    return housingTypeElement.value !== 'any' ? element.offer.type === housingTypeElement.value : true;
  };

  var filterRoomsAmount = function (element) {
    return housingRoomElement.value !== 'any' ? element.offer.rooms === parseInt(housingRoomElement.value, 10) : true;
  };

  var filterGuestsAmount = function (element) {
    if (housingGuestElement.value === '1' || housingGuestElement.value === '2') {
      return element.offer.guests >= parseInt(housingGuestElement.value, 10);
    } else if (housingGuestElement.value === '0') {
      return element.offer.guests === parseInt(housingGuestElement.value, 10);
    } else {
      return true;
    }
  };

  var filterWiFi = function (element) {
    return wifiFeatureElement.checked ? element.offer.features.includes(wifiFeatureElement.value) : true;
  };

  var filterDishwasher = function (element) {
    return dishwasherFeatureElement.checked ? element.offer.features.includes(dishwasherFeatureElement.value) : true;
  };

  var filterParking = function (element) {
    return parkingFeatureElement.checked ? element.offer.features.includes(parkingFeatureElement.value) : true;
  };

  var filterWasher = function (element) {
    return washerFeatureElement.checked ? element.offer.features.includes(washerFeatureElement.value) : true;
  };

  var filterElevator = function (element) {
    return elevatorFeatureElement.checked ? element.offer.features.includes(elevatorFeatureElement.value) : true;
  };

  var filterConditioner = function (element) {
    return conditionerFeatureElement.checked ? element.offer.features.includes(conditionerFeatureElement.value) : true;
  };

  var onMapFiltersChange = function () {
    var cardElement = document.querySelector('.map__card');

    var filteredOffers = window.offersMap
      .filter(function (it) {
        return filterPrice(it) &&
          filterType(it) &&
          filterRoomsAmount(it) &&
          filterGuestsAmount(it) &&
          filterWiFi(it) &&
          filterDishwasher(it) &&
          filterParking(it) &&
          filterWasher(it) &&
          filterElevator(it) &&
          filterConditioner(it);
      });

    if (cardElement) {
      cardElement.remove();
    }
    removeOffers();
    window.renderPins(filteredOffers);
  };

  mapFiltersElement.addEventListener('change', function () {
    debounce(onMapFiltersChange);
  });
})();
