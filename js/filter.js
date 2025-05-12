const ANY_VALUE = 'any';

const filtersForm = document.querySelector('.map__filters');

const getOfferFilter = () => {
  const condition = getFilterCondition();
  const filterByType = getTypeFilter(condition.type);
  const filterByPrice = getPriceFilter(condition.price);
  const filterByRooms = getRoomsFilter(condition.rooms);
  const filterByGuests = getGuestsFilter(condition.guests);
  const filterByFeatures = getFeaturesFilter(condition.features);

  return (offerData) => {
    return filterByType(offerData) &&
      filterByPrice(offerData) &&
      filterByRooms(offerData) &&
      filterByGuests(offerData) &&
      filterByFeatures(offerData);
  };
};

const getFilterCondition = () => {
  let condition = {};

  condition.type = filtersForm.querySelector('#housing-type').value;
  condition.price = filtersForm.querySelector('#housing-price').value;
  condition.rooms = filtersForm.querySelector('#housing-rooms').value;
  condition.guests = filtersForm.querySelector('#housing-guests').value;
  condition.features = [];
  const features = filtersForm.querySelectorAll('#housing-features input[type="checkbox"]');
  for (let i = 0; i < features.length; ++i) {
    const featureCheckbox = features[i];
    if (featureCheckbox.checked) {
      condition.features.push(featureCheckbox.value);
    }
  }

  return condition;
};

const getTypeFilter = (type) => {
  return (offerData) => {
    if (type === ANY_VALUE) {
      return true;
    }
    const offerType = offerData.offer.type;
    return offerType === type;
  };
};

const getPriceFilter = (price) => {
  return (offerData) => {
    if (price === ANY_VALUE) {
      return true;
    }
    const offerPrice = offerData.offer.price;
    switch (price) {
      case 'low':
        return offerPrice < 10000;
      case 'middle':
        return offerPrice >= 10000 && offerPrice < 50000;
      case 'high':
        return offerPrice >= 50000;
    }
    return false;
  };
};

const getRoomsFilter = (rooms) => {
  return (offerData) => {
    if (rooms === ANY_VALUE) {
      return true;
    }
    const offerRooms = offerData.offer.rooms;
    return offerRooms === +rooms;
  };
};

const getGuestsFilter = (guests) => {
  return (offerData) => {
    if (guests === ANY_VALUE) {
      return true;
    }
    const offerGuests = offerData.offer.guests;
    return offerGuests === +guests;
  };
};

const getFeaturesFilter = (features) => {
  return (offerData) => {
    if (!features) {
      return true;
    }
    const offerFeatures = offerData.offer.features || [];
    return features.every((f) => offerFeatures.includes(f));
  };
};

export { getOfferFilter };
