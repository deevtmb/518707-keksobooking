'use strict';

(function () {
  var startCoordinates = {};
  var mapElement = document.querySelector('.map');
  var mapPinMainElement = mapElement.querySelector('.map__pin--main');
  var formElement = document.querySelector('.ad-form');

  var activateMap = function () {
    mapElement.classList.remove('map--faded');
    formElement.classList.remove('ad-form--disabled');

    window.form.enableForm();
    window.renderPins(window.offers);
  };

  var onMouseMove = function (moveEvt) {
    if (mapElement.classList.contains('map--faded')) {
      activateMap();
    }

    var shift = {
      x: startCoordinates.x - moveEvt.clientX,
      y: startCoordinates.y - moveEvt.clientY
    };

    startCoordinates = {
      x: moveEvt.x,
      y: moveEvt.y
    };

    var positionX = mapPinMainElement.offsetLeft - shift.x;
    var positionY = mapPinMainElement.offsetTop - shift.y;

    if (positionX < 0) {
      positionX = 0;
    } else if (positionX > mapElement.offsetWidth - window.utils.MAP_PIN_WIDTH) {
      positionX = mapElement.offsetWidth - window.utils.MAP_PIN_WIDTH;
    }

    if (positionY < (window.utils.LOCATION_Y_MIN - window.utils.MAP_PIN_HEIGHT)) {
      positionY = window.utils.LOCATION_Y_MIN - window.utils.MAP_PIN_HEIGHT;
    } else if (positionY > (window.utils.LOCATION_Y_MAX - window.utils.MAP_PIN_HEIGHT)) {
      positionY = window.utils.LOCATION_Y_MAX - window.utils.MAP_PIN_HEIGHT;
    }

    window.form.setAddressValue();

    mapPinMainElement.style.left = positionX + 'px';
    mapPinMainElement.style.top = positionY + 'px';
  };

  var onMouseUp = function () {
    window.form.setAddressValue();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  mapPinMainElement.addEventListener('mousedown', function (evt) {
    startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mapPinMainElement.addEventListener('click', function () {
    activateMap();
    mapPinMainElement.removeEventListener('click', activateMap);
  });
})();
