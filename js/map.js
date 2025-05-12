import {disableNoticeForm, updateAddress} from './notice.js';
import {renderCard} from './card.js';
import {getOffers} from './api.js';
import {showAlert} from './msgdlg.js';
import {getOfferFilter} from './filter.js';
import {debounce} from './util.js';
/* global L:readonly */

const OFFERS_MAX_COUNT = 10;
const START_ZOOM = 12;

// Начальная точка - центр карты
const MapCenter = {
  LAT: 35.68196,
  LNG: 139.75125,
};

const MainPinSize = {
  CX: 52,
  CY: 52,
};

const MainPinAnchor = {
  X: 26,
  Y: 52,
};

const PinSize = {
  CX: 40,
  CY: 40,
};

const PinAnchor = {
  X: 20,
  Y: 40,
};

const filtersForm = document.querySelector('.map__filters');

const disableFiltersForm = (disabled) => {
  if (disabled) {
    filtersForm.classList.add('map__filters--disabled');
  } else {
    filtersForm.classList.remove('map__filters--disabled');
  }

  const elems = filtersForm.querySelectorAll('fieldset, select');
  for (let i = 0; i < elems.length; ++i) {
    elems[i].disabled = disabled;
  }
};

const disableMap = (disabled) => {
  disableFiltersForm(disabled);
  disableNoticeForm(disabled);
};

const resetMap = () => {
  filtersForm.reset();
  setTimeout(() => {
    resetMainPinMarker();
    updateOffersDebounced();
  }, 0);
};

const createMap = () => {
  disableMap(true);

  const map = L.map('map-canvas')
    .on('load', () => {
      disableMap(false);
    })
    .setView({
      lat: MapCenter.LAT,
      lng: MapCenter.LNG,
    }, START_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  return map;
};

const createMainPinMarker = () => {
  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [MainPinSize.CX, MainPinSize.CY],
    iconAnchor: [MainPinAnchor.X, MainPinAnchor.Y],
  });

  const mainPinMarker = L.marker(
    {
      lat: MapCenter.LAT,
      lng: MapCenter.LNG,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    updateAddress(evt.target.getLatLng());
  });

  updateAddress(mainPinMarker.getLatLng());

  const typeFilterElem = filtersForm.querySelector('#housing-type');
  typeFilterElem.addEventListener('change', updateOffersDebounced);

  return mainPinMarker;
};

const resetMainPinMarker = () => {
  const centerPoint = {
    lat: MapCenter.LAT,
    lng: MapCenter.LNG,
  };
  mainPinMarker.setLatLng(centerPoint);
  updateAddress(mainPinMarker.getLatLng());
};

const createPinMarkers = (offers) => {
  if (!offers) return;

  const pinIcon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [PinSize.CX, PinSize.CY],
    iconAnchor: [PinAnchor.X, PinAnchor.Y],
  });

  offers.forEach((offerData) => {
    const {lat, lng} = offerData.location;

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        draggable: false,
        icon: pinIcon,
      },
    );

    markers.push(marker);

    marker.addTo(map)
      .bindPopup(
        renderCard(offerData),
      );
  });
};

const clearPinMarkers = () => {
  for (let i = 0; i < markers.length; ++i) {
    markers[i].remove();
  }
  markers = [];
};

const loadOffers = () => {
  getOffers()
    .then(createOffers)
    .catch((err) => {
      showAlert(err.message);
    });
};

const createOffers = (data) => {
  offers = data;
  createPinMarkers(offers.slice(0, OFFERS_MAX_COUNT));
};

const updateOffers = () => {
  clearPinMarkers();
  createPinMarkers(offers.filter(getOfferFilter()).slice(0, OFFERS_MAX_COUNT));
};

let offers = [];
let markers = [];

const updateOffersDebounced = debounce(updateOffers);
const map = createMap();
const mainPinMarker = createMainPinMarker();

export { loadOffers, resetMap };
