'use strict';

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
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var LOCATION_X_MIN = 50;
var LOCATION_X_MAX = document.querySelector('.map').offsetWidth;


var mapElement = document.querySelector('.map');
var mapPinsElement = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

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

// Исправить
var getOfferFeatures = function (features) {
  var featuresList = features;
  featuresList.length = Math.floor(Math.random() * (featuresList.length + 1));

  return featuresList;
};

var showMap = function () {
  mapElement.classList.remove('map--faded');
};

var createOffers = function (amount) {
  var offers = [];

  for (var i = 0; i < amount; i++) {
    offers.push({
      location: {
        x: getRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX - LOCATION_X_MIN),
        y: getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX)
      },
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: getRandomElement(OFFER_TITLES, true),
        // address:
        price: getRandomNumber(OFFER_MIN_PRICE, OFFER_MAX_PRICE),
        type: getRandomElement(OFFER_TYPE),
        rooms: getRandomNumber(OFFER_MIN_ROOMS, OFFER_MAX_ROOMS),
        guests: getRandomNumber(OFFER_MIN_GUESTS, OFFER_MAX_GUESTS),
        checkin: getRandomElement(CHECKIN_CHECKOUT_TIME),
        checkout: getRandomElement(CHECKIN_CHECKOUT_TIME),
        // Исправить
        features: getOfferFeatures(OFFER_FEATURES),
        description: '',
        photos: OFFER_PHOTOS
      }
    });
  }

  return offers;
};

var renderMapPin = function (offer) {
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var mapPinElement = mapPinTemplate.cloneNode(true);

  mapPinElement.style = 'left: ' + (offer.location.x - mapPinElement.style.width / 2) + 'px; ' + 'top: ' + (offer.location.y - mapPinElement.style.height) + 'px;';
  mapPinElement.querySelector('img').src = offer.author.avatar;
  mapPinElement.querySelector('img').alt = offer.offer.title;

  return mapPinElement;
};

var renderOffers = function () {
  var offersList = createOffers(OFFERS_AMOUNT);

  for (var i = 0; i < offersList.length; i++) {
    fragment.appendChild(renderMapPin(offersList[i]));
  }
  mapPinsElement.appendChild(fragment);

  showMap();
};

renderOffers();
