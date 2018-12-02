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
var MAP_PIN_HEIGHT = 70;
var MAP_PIN_WIDTH = 50;
var ESC_KEYCODE = 27;

var randomOffers = [];
var mapElement = document.querySelector('.map');
var mapElementWidth = mapElement.offsetWidth;
var mapElementHeight = mapElement.offsetHeight;
var mapPinElements = mapElement.querySelector('.map__pins');
var mapPinMainElement = mapElement.querySelector('.map__pin--main');
var mapFiltersElement = mapElement.querySelector('.map__filters-container');
var offerCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var formElement = document.querySelector('.ad-form');
var formFieldsetElements = formElement.querySelectorAll('fieldset');
var addressInputElement = formElement.querySelector('#address');

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
  var mapPin = mapPinTemplate.cloneNode(true);

  mapPin.style = 'left: ' + (offerItem.location.x - MAP_PIN_WIDTH / 2) + 'px; ' + 'top: ' + (offerItem.location.y - MAP_PIN_HEIGHT) + 'px;';
  mapPin.querySelector('img').src = offerItem.author.avatar;
  mapPin.querySelector('img').alt = offerItem.offer.title;

  mapPin.addEventListener('click', function () {
    var popup = mapElement.querySelector('.popup');
    if (popup) {
      mapElement.removeChild(popup);
    }
    renderOfferCard(offerItem);
  });

  return mapPin;
};

var renderMapPins = function (offers) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(createMapPin(offers[i]));
  }
  mapPinElements.appendChild(fragment);
};

var addOfferPhotos = function (photos) {
  var photoFragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    var photo = document.createElement('img');
    photo.className = 'popup__photo';
    photo.src = photos[i];
    photo.alt = 'Фотография жилья';
    photo.width = 40;
    photo.height = 40;
    photoFragment.appendChild(photo);
  }

  return photoFragment;
};

var renderOfferCard = function (offerItem) {
  var offerCard = offerCardTemplate.cloneNode(true);
  var cardCloseButton = offerCard.querySelector('.popup__close');

  offerCard.querySelector('.popup__title').textContent = offerItem.offer.title;
  offerCard.querySelector('.popup__text--address').textContent = offerItem.offer.address;
  offerCard.querySelector('.popup__text--price').textContent = offerItem.offer.price + '₽/ночь';
  offerCard.querySelector('.popup__type').textContent = OFFER_TYPE_NAME[offerItem.offer.type];
  offerCard.querySelector('.popup__text--capacity').textContent = 'Комнат - ' + offerItem.offer.rooms + ', вмещает гостей - ' + offerItem.offer.guests;
  offerCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerItem.offer.checkin + ', выезд до ' + offerItem.offer.checkout;
  offerCard.querySelector('.popup__features').textContent = offerItem.offer.features.join(', ');
  offerCard.querySelector('.popup__description').textContent = offerItem.offer.description;
  offerCard.querySelector('.popup__avatar').src = offerItem.author.avatar;
  offerCard.querySelector('.popup__photos').replaceChild(addOfferPhotos(offerItem.offer.photos), offerCard.querySelector('.popup__photo'));

  mapElement.insertBefore(offerCard, mapFiltersElement);

  cardCloseButton.addEventListener('click', function () {
    mapElement.removeChild(offerCard);
  });
};

var generateRandomOffers = function () {
  randomOffers = createOffers(OFFERS_AMOUNT);
};

var enableForm = function () {
  for (var i = 0; i < formFieldsetElements.length; i++) {
    formFieldsetElements[i].removeAttribute('disabled');
  }
};

var disableForm = function () {
  if (formElement.classList.contains('ad-form--disabled')) {
    for (var i = 0; i < formFieldsetElements.length; i++) {
      formFieldsetElements[i].setAttribute('disabled', true);
    }
  }
};

var activateMap = function () {
  mapElement.classList.remove('map--faded');
  formElement.classList.remove('ad-form--disabled');

  enableForm();
  renderMapPins(randomOffers);
};

window.addEventListener('load', function () {
  disableForm();
  addressInputElement.value = (mapElementWidth / 2 - MAP_PIN_WIDTH / 2) + ', ' + (mapElementHeight / 2 - MAP_PIN_HEIGHT);
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE && mapElement.querySelector('.map__card')) {
    mapElement.removeChild(mapElement.querySelector('.map__card'));
  }
});

mapPinMainElement.addEventListener('mouseup', activateMap);

generateRandomOffers();
