'use strict';

var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TYPE_NAME = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};
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

var mapElement = document.querySelector('.map');
var mapElementWidth = mapElement.offsetWidth;
var mapPinsElement = document.querySelector('.map__pins');
var mapFiltersElement = document.querySelector('.map__filters-container');

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

var showMap = function () {
  mapElement.classList.remove('map--faded');
};

var createOffers = function (amount) {
  var offers = [];

  for (var i = 0; i < amount; i++) {
    var coordinateX = getRandomNumber(mapElementWidth * 0.1, mapElementWidth * 0.9);
    var coordinateY = getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX);

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

var createMapPin = function (offerItem) {
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var mapPinElement = mapPinTemplate.cloneNode(true);
  mapPinElement.style = 'left: ' + (offerItem.location.x + mapPinElement.style.width / 2) + 'px; ' + 'top: ' + (offerItem.location.y + mapPinElement.style.height) + 'px;';
  mapPinElement.querySelector('img').src = offerItem.author.avatar;
  mapPinElement.querySelector('img').alt = offerItem.offer.title;

  return mapPinElement;
};

var renderMapPins = function (offers) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(createMapPin(offers[i]));
  }
  mapPinsElement.appendChild(fragment);
};

var renderOfferCard = function (offerItem) {
  var offerCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var offerCard = offerCardTemplate.cloneNode(true);

  offerCard.querySelector('.popup__title').textContent = offerItem.offer.title;
  offerCard.querySelector('.popup__text--address').textContent = offerItem.offer.address;
  offerCard.querySelector('.popup__text--price').textContent = offerItem.offer.price + '₽/ночь';
  offerCard.querySelector('.popup__type').textContent = OFFER_TYPE_NAME[offerItem.offer.type];
  offerCard.querySelector('.popup__text--capacity').textContent = 'Комнат - ' + offerItem.offer.rooms + ', вмещает гостей - ' + offerItem.offer.guests;
  offerCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerItem.offer.checkin + ', выезд до ' + offerItem.offer.checkout;
  offerCard.querySelector('.popup__features').textContent = offerItem.offer.features.join(', ');
  offerCard.querySelector('.popup__description').textContent = offerItem.offer.description;
  offerCard.querySelector('.popup__avatar').src = offerItem.author.avatar;

  var photos = offerCard.querySelector('.popup__photos');
  var photo = offerCard.querySelector('.popup__photo');

  for (var i = 0; i < offerItem.offer.photos.length - 1; i++) {
    photos.appendChild(photo.cloneNode(true));
  }

  var photoList = offerCard.querySelectorAll('.popup__photo');

  for (var j = 0; j < photoList.length; j++) {
    photoList[j].src = offerItem.offer.photos[j];
  }

  mapElement.insertBefore(offerCard, mapFiltersElement);
};

var init = function () {
  var offers = createOffers(OFFERS_AMOUNT);
  renderMapPins(offers);
  renderOfferCard(offers[0]);
  showMap();
};

init();
