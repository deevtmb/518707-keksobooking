'use strict';

(function () {
  var offerTypeMap = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};

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

  var getFeaturesList = function (features) {
    var featuresList = document.createElement('ul');
    featuresList.className = 'popup__features';
    for (var i = 0; i < features.length; i++) {
      var feature = document.createElement('li');
      feature.className = 'popup__feature popup__feature--' + features[i];
      featuresList.appendChild(feature);
    }

    return featuresList;
  };

  window.renderCard = function (offerItem) {
    var offerCard = offerCardTemplate.cloneNode(true);
    var cardCloseButton = offerCard.querySelector('.popup__close');

    offerCard.querySelector('.popup__title').textContent = offerItem.offer.title;
    offerCard.querySelector('.popup__text--address').textContent = offerItem.offer.address;
    offerCard.querySelector('.popup__text--price').textContent = offerItem.offer.price + '₽/ночь';
    offerCard.querySelector('.popup__type').textContent = offerTypeMap[offerItem.offer.type];
    offerCard.querySelector('.popup__text--capacity').textContent = 'Комнат - ' + offerItem.offer.rooms + ', вмещает гостей - ' + offerItem.offer.guests;
    offerCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerItem.offer.checkin + ', выезд до ' + offerItem.offer.checkout;
    offerCard.replaceChild(getFeaturesList(offerItem.offer.features), offerCard.querySelector('.popup__features'));
    offerCard.querySelector('.popup__description').textContent = offerItem.offer.description;
    offerCard.querySelector('.popup__avatar').src = offerItem.author.avatar;
    offerCard.replaceChild(addOfferPhotos(offerItem.offer.photos), offerCard.querySelector('.popup__photos'));

    if (offerCard.querySelector('.popup__description').textContent === '') {
      offerCard.querySelector('.popup__description').remove();
    }
    if (offerCard.querySelector('.popup__features').innerHTML === '') {
      offerCard.querySelector('.popup__features').remove();
    }

    mapElement.insertBefore(offerCard, mapFiltersElement);

    cardCloseButton.addEventListener('click', function () {
      mapElement.removeChild(offerCard);
    });

    document.addEventListener('keydown', function (evt) {
      var cardElement = document.querySelector('.map__card');

      if (evt.keyCode === window.utils.ESC_KEYCODE && cardElement) {
        cardElement.remove();
      }
    });
  };
})();