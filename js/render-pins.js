'use strict';

(function () {
  var OFFERS_AMOUNT = 5;

  var mapElement = document.querySelector('.map');
  var mapPinsContainerElement = mapElement.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var createMapPin = function (offerItem) {
    var mapPin = mapPinTemplate.cloneNode(true);

    mapPin.style = 'left: ' + (offerItem.location.x - window.utils.MAP_PIN_WIDTH / 2) + 'px; ' + 'top: ' + (offerItem.location.y - window.utils.MAP_PIN_HEIGHT) + 'px;';
    mapPin.querySelector('img').src = offerItem.author.avatar;
    mapPin.querySelector('img').alt = offerItem.offer.title;

    mapPin.addEventListener('click', function () {
      var popup = mapElement.querySelector('.popup');
      var activePinElement = mapElement.querySelector('.map__pin--active');
      if (popup) {
        mapElement.removeChild(popup);
      }
      if (activePinElement) {
        activePinElement.classList.remove('map__pin--active');
      }
      mapPin.classList.add('map__pin--active');
      window.renderCard(offerItem);
    });

    return mapPin;
  };

  window.renderPins = function (offers) {
    var fragment = document.createDocumentFragment();
    var amount = offers.length > OFFERS_AMOUNT ? OFFERS_AMOUNT : offers.length;

    for (var i = 0; i < amount; i++) {
      fragment.appendChild(createMapPin(offers[i]));
    }
    mapPinsContainerElement.appendChild(fragment);
  };
})();
