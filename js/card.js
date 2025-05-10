const cardTemplate = document.querySelector('#card').content;

const getOfferType = function (type) {
  switch (type) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'hotel':
      return 'Отель';
    case 'bungalow':
      return 'Бунгало';
  }
};

const renderFeature = function (feature) {
  const featureElem = document.createElement('li');
  const featureClassName = `popup__feature--${feature}`;
  featureElem.classList.add('popup__feature', featureClassName);
  return featureElem;
};

const renderFeaturesIn = function (featuresElem, features) {
  featuresElem.innerHTML = '';
  if (!features || !features.length) return;
  for (let i = 0; i < features.length; ++i) {
    featuresElem.appendChild(renderFeature(features[i]));
  }
};

const renderPhoto = function (photo) {
  const photoElem = document.createElement('img');
  photoElem.classList.add('popup__photo');
  photoElem.width = 45;
  photoElem.height = 40;
  photoElem.alt = 'Фотография жилья';
  photoElem.src = photo;
  return photoElem;
};

const renderPhotosIn = function (photosElem, photos) {
  photosElem.innerHTML = '';
  if (!photos || !photos.length) return;
  for (let i = 0; i < photos.length; ++i) {
    photosElem.appendChild(renderPhoto(photos[i]));
  }
};

const renderCard = function (offerData) {
  const { author, offer } = offerData;
  const {
    title, address, price, type, rooms, guests, checkin, checkout,
    features, description, photos,
  } = offer;
  const card = cardTemplate.querySelector('.popup').cloneNode(true);

  card.querySelector('.popup__title').textContent = title;
  card.querySelector('.popup__text--address').textContent = address;
  card.querySelector('.popup__text--price').textContent = price + ' ₽/ночь';
  card.querySelector('.popup__type').textContent = getOfferType(type);
  card.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  renderFeaturesIn(card.querySelector('.popup__features'), features);
  card.querySelector('.popup__description').textContent = description;
  renderPhotosIn(card.querySelector('.popup__photos'), photos);
  card.querySelector('.popup__avatar').src = author.avatar;

  return card;
};

export { renderCard };
