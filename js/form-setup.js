'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var mapElement = document.querySelector('.map');
  var mapMainPinElement = document.querySelector('.map__pin--main');
  var formElement = document.querySelector('.ad-form');
  var formFieldsetElements = formElement.querySelectorAll('fieldset');
  var resetButtonElement = formElement.querySelector('.ad-form__reset');
  var addressInputElement = formElement.querySelector('#address');
  var avatarChooserElement = formElement.querySelector('.ad-form-header__input');
  var avatarPreviewElement = formElement.querySelector('.ad-form-header__preview img');
  var photoContainerElement = formElement.querySelector('.ad-form__photo-container');
  var photoChooserElement = formElement.querySelector('.ad-form__input');
  var photoPreviewElement = formElement.querySelector('.ad-form__photo');

  var mainPinPositionLeft = mapMainPinElement.style.left;
  var mainPinPositionTop = mapMainPinElement.style.top;

  var setAddressValue = function () {
    addressInputElement.value = (mapMainPinElement.offsetLeft + window.utils.MAP_PIN_WIDTH / 2) + ', ' + (mapMainPinElement.offsetTop + window.utils.MAP_PIN_HEIGHT);
  };

  var disableForm = function () {
    if (formElement.classList.contains('ad-form--disabled')) {
      for (var i = 0; i < formFieldsetElements.length; i++) {
        formFieldsetElements[i].disabled = true;
      }
    }
  };

  var enable = function () {
    for (var i = 0; i < formFieldsetElements.length; i++) {
      formFieldsetElements[i].removeAttribute('disabled');
    }
  };

  var setDisableMode = function () {
    var mapPinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var offerCardElement = document.querySelector('.map__card');

    mapElement.classList.add('map--faded');
    formElement.classList.add('ad-form--disabled');
    mapMainPinElement.style.left = mainPinPositionLeft;
    mapMainPinElement.style.top = mainPinPositionTop;

    for (var i = 0; i < mapPinElements.length; i++) {
      mapPinElements[i].remove();
    }
    if (offerCardElement) {
      offerCardElement.remove();
    }

    disableForm();
    formElement.reset();
    setAddressValue();
    window.scrollTo(0, 0);
  };

  var onSuccessSubmit = function () {
    window.userMsg.onSuccessSave();
    setDisableMode();
  };

  window.addEventListener('load', function () {
    disableForm();
    setAddressValue();
  });

  avatarChooserElement.addEventListener('change', function () {
    var file = avatarChooserElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreviewElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photoChooserElement.addEventListener('change', function () {
    var file = photoChooserElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      var photo = document.createElement('img');
      photo.className = 'ad-form__photo';

      if (photoPreviewElement.innerHTML) {
        var newPhotoElement = document.createElement('div');
        newPhotoElement.className = 'ad-form__photo';
        newPhotoElement.appendChild(photo);
        photoContainerElement.appendChild(newPhotoElement);
      } else {
        photoPreviewElement.appendChild(photo);
      }

      reader.addEventListener('load', function () {
        photo.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  resetButtonElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    setDisableMode();
  });

  window.formSetup = {
    enable: enable,
    onSuccessSubmit: onSuccessSubmit,
    setAddressValue: setAddressValue
  };
})();
