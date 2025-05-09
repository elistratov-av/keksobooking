import {getRandomInt, getRandomFloat, getRandomArrayElem, shuffle, zfill} from './util.js';

const OFFERS_COUNT = 8;
const COORD_DIGITS = 5;

const TITLES = [
  'Однокомнатная квартира',
  'Двухкомнатная квартира',
  'Коттедж',
  'Вилла',
  'Комната в коммуналке',
  'Апартаменты',
  'Однокомнатная квартира, 25 кв.м.',
  'Трехкомнатная квартира',
];

const DESCRIPTIONS = [
  'Великолепное жилье недалеко от центра города',
  'Небольшая, но уютная квартира',
  'Светлая, чистая квартира в тихом районе',
  'Просторное жилье, недалеко от вокзала',
  'Лучшее предложение в этой ценовой категории',
];

const TYPES = [
  'palace', 'flat', 'house', 'hotel', 'bungalow',
];

const TIMES = [
  '12:00', '13:00', '14:00',
];

const FEATURES = [
  'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const Price = {
  MIN: 1,
  MAX: 900,
};

const RoomsCount = {
  MIN: 1,
  MAX: 5,
};

const GuestsCount = {
  MIN: 1,
  MAX: 7,
};

// Широта
const Latitude = {
  MIN: 35.65000,
  MAX: 35.70000,
};

// Долгота
const Longitude = {
  MIN: 139.70000,
  MAX: 139.80000,
};

const createAvatarUrl = (i) => 'img/avatars/user' + zfill(i, 2) + '.png';

const createAuthor = (i) => {
  return {
    avatar: createAvatarUrl(i),
  };
};

const createOffer = (location) => {
  return {
    title: getRandomArrayElem(TITLES),
    address: location.x + ', ' + location.y,
    price: getRandomInt(Price.MIN, Price.MAX),
    type: getRandomArrayElem(TYPES),
    rooms: getRandomInt(RoomsCount.MIN, RoomsCount.MAX),
    guests: getRandomInt(GuestsCount.MIN, GuestsCount.MAX),
    checkin: getRandomArrayElem(TIMES),
    checkout: getRandomArrayElem(TIMES),
    features: shuffle(FEATURES, getRandomInt(1, FEATURES.length)),
    description: getRandomArrayElem(DESCRIPTIONS),
    photos: shuffle(PHOTOS, getRandomInt(1, PHOTOS.length)),
  };
};

const createLocation = () => {
  return {
    x: getRandomFloat(Latitude.MIN, Latitude.MAX, COORD_DIGITS),
    y: getRandomFloat(Longitude.MIN, Longitude.MAX, COORD_DIGITS),
  };
};

const createOfferData = (i) => {
  const location = createLocation();
  return {
    author: createAuthor(i),
    offer: createOffer(location),
    location: location,
  };
};

const generateOffers = () => {
  let offers = [];
  for (let i = 0; i < OFFERS_COUNT; ++i) {
    offers.push(createOfferData(i + 1));
  }
  return offers;
};

export { generateOffers };
