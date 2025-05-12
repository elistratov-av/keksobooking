const ANY_VALUE = 'any';

const filtersForm = document.querySelector('.map__filters');

const getOfferFilter = () => {
  const condition = getFilterCondition();
  const filterByType = getTypeFilter(condition.type);

  return (offerData) => {
    return filterByType(offerData);
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

export { getOfferFilter };
