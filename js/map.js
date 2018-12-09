'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mapPinElements = mapElement.querySelector('.map__pins');
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
      if (popup) {
        mapElement.removeChild(popup);
      }
      window.card(offerItem);
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

  window.map = renderMapPins;
})();
