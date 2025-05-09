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
  const featureElement = document.createElement('li');
  const featureClassName = `popup__feature--${feature}`;
  featureElement.classList.add('popup__feature', featureClassName);
  return featureElement;
};

const renderFeaturesIn = function (featuresElement, features) {
  featuresElement.innerHTML = '';
  if (!features || !features.length) return;
  for (let i = 0; i < features.length; ++i) {
    featuresElement.appendChild(renderFeature(features[i]));
  }
};

const renderPhoto = function (photo) {
  const photoElement = document.createElement('img');
  photoElement.classList.add('popup__photo');
  photoElement.width = 45;
  photoElement.height = 40;
  photoElement.alt = 'Фотография жилья';
  photoElement.src = photo;
  return photoElement;
};

const renderPhotosIn = function (photosElement, photos) {
  photosElement.innerHTML = '';
  if (!photos || !photos.length) return;
  for (let i = 0; i < photos.length; ++i) {
    photosElement.appendChild(renderPhoto(photos[i]));
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
  card.querySelector('.popup__features').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  renderFeaturesIn(card.querySelector('.popup__features'), features);
  card.querySelector('.popup__description').textContent = description;
  renderPhotosIn(card.querySelector('.popup__photos'), photos);
  card.querySelector('.popup__avatar').src = author.avatar;

  return card;
};

export { renderCard };
