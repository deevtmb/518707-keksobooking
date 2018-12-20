'use strict';

(function () {
  var OFFER_TYPE_NAME = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};
  var FEATURE_NAME = {wifi: 'Wi-Fi', dishwasher: 'Кухня', parking: 'Парковка', washer: 'Стиральная машина', elevator: 'Лифт', conditioner: 'Кондиционер'};

  var mapElement = document.querySelector('.map');
  var mapFiltersElement = mapElement.querySelector('.map__filters-container');
  var offerCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

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

  var getFeatureNames = function (features) {
    var featureNames = [];
    for (var i = 0; i < features.length; i++) {
      featureNames.push(FEATURE_NAME[features[i]]);
    }

    return featureNames;
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
    offerCard.querySelector('.popup__features').textContent = getFeatureNames(offerItem.offer.features).join(', ');
    offerCard.querySelector('.popup__description').textContent = offerItem.offer.description;
    offerCard.querySelector('.popup__avatar').src = offerItem.author.avatar;
    offerCard.replaceChild(addOfferPhotos(offerItem.offer.photos), offerCard.querySelector('.popup__photos'));

    if (offerCard.querySelector('.popup__description').textContent === '') {
      offerCard.querySelector('.popup__description').remove();
    }
    if (offerCard.querySelector('.popup__features').textContent === '') {
      offerCard.querySelector('.popup__features').remove();
    }

    mapElement.insertBefore(offerCard, mapFiltersElement);

    cardCloseButton.addEventListener('click', function () {
      mapElement.removeChild(offerCard);
    });

    document.addEventListener('keydown', function (evt) {
      var cardElement = document.querySelector('.map__card');

      if (evt.keyCode === window.userMsg.ESC_KEYCODE && cardElement) {
        cardElement.remove();
      }
    });
  };

  window.renderCard = renderOfferCard;
})();
