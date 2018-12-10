'use strict';

(function () {
  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var CHECKIN_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
  var OFFER_MIN_PRICE = 1000;
  var OFFER_MAX_PRICE = 1000000;
  var OFFER_MIN_ROOMS = 1;
  var OFFER_MAX_ROOMS = 5;
  var OFFER_MIN_GUESTS = 1;
  var OFFER_MAX_GUESTS = 8;
  var OFFERS_AMOUNT = 8;

  var randomOffers = [];
  var mapElementWidth = document.querySelector('.map').offsetWidth;

  var getRandomNumber = function (minNumber, maxNumber) {
    var randomNumber = Math.floor(minNumber + (Math.random() * (maxNumber - minNumber + 1)));

    return randomNumber;
  };

  var getRandomElement = function (array, cut) {
    var i = Math.floor(Math.random() * array.length);
    var randomElement = array[i];
    if (cut) {
      array.splice(i, 1);
    }

    return randomElement;
  };

  var getOfferFeatures = function (features) {
    var featuresList = [];
    var randomAmount = getRandomNumber(1, features.length);
    for (var i = 0; i < randomAmount; i++) {
      featuresList.push(features[i]);
    }

    return featuresList;
  };

  var shufflePhotos = function (photos) {
    var photoList = [];
    for (var i = photos.length - 1; i >= 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var swap = photos[i];
      photos[i] = photos[j];
      photos[j] = swap;
      photoList.push(photos[i]);
    }

    return photoList;
  };

  var createOffers = function (amount) {
    var offers = [];

    for (var i = 0; i < amount; i++) {
      var coordinateX = getRandomNumber(mapElementWidth * 0.1, mapElementWidth * 0.9);
      var coordinateY = getRandomNumber(window.utils.LOCATION_Y_MIN, window.utils.LOCATION_Y_MAX);

      offers.push({
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: getRandomElement(OFFER_TITLES, true),
          address: coordinateX + ', ' + coordinateY,
          price: getRandomNumber(OFFER_MIN_PRICE, OFFER_MAX_PRICE),
          type: getRandomElement(OFFER_TYPE),
          rooms: getRandomNumber(OFFER_MIN_ROOMS, OFFER_MAX_ROOMS),
          guests: getRandomNumber(OFFER_MIN_GUESTS, OFFER_MAX_GUESTS),
          checkin: getRandomElement(CHECKIN_CHECKOUT_TIME),
          checkout: getRandomElement(CHECKIN_CHECKOUT_TIME),
          features: getOfferFeatures(OFFER_FEATURES),
          description: '',
          photos: shufflePhotos(OFFER_PHOTOS)
        },
        location: {
          x: coordinateX,
          y: coordinateY
        }
      });
    }

    return offers;
  };

  var generateRandomOffers = function () {
    randomOffers = createOffers(OFFERS_AMOUNT);
  };

  generateRandomOffers();

  window.offers = randomOffers;
})();
