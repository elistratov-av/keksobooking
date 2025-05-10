const MAX_PRICE = 1000000;
const PALACE_MIN_PRICE = 10000;
const FLAT_MIN_PRICE = 1000;
const HOUSE_MIN_PRICE = 5000;
const HOTEL_MIN_PRICE = 3000;
const BUNGALOW_MIN_PRICE = 0;

const noticeForm = document.querySelector('.ad-form');
const typeElem = noticeForm.querySelector('#type');
const priceElem = noticeForm.querySelector('#price');
const timeinElem = noticeForm.querySelector('#timein');
const timeoutElem = noticeForm.querySelector('#timeout');
const addressElem = noticeForm.querySelector('#address');

const disableNoticeForm = (disabled) => {
  if (disabled) {
    noticeForm.classList.add('ad-form--disabled');
  } else {
    noticeForm.classList.remove('ad-form--disabled');
  }

  const elems = noticeForm.querySelectorAll('fieldset');
  for (let i = 0; i < elems.length; ++i) {
    elems[i].disabled = disabled;
  }
}

const onTypeChange = function () {
  const type = typeElem.value;

  priceElem.max = MAX_PRICE;
  switch (type) {
    case 'palace':
      priceElem.min = PALACE_MIN_PRICE;
      priceElem.placeholder = PALACE_MIN_PRICE;
      break;
    case 'flat':
      priceElem.min = FLAT_MIN_PRICE;
      priceElem.placeholder = FLAT_MIN_PRICE;
      break;
    case 'house':
      priceElem.min = HOUSE_MIN_PRICE;
      priceElem.placeholder = HOUSE_MIN_PRICE;
      break;
    case 'hotel':
      priceElem.min = HOTEL_MIN_PRICE;
      priceElem.placeholder = HOTEL_MIN_PRICE;
      break;
    case 'bungalow':
      priceElem.min = BUNGALOW_MIN_PRICE;
      priceElem.placeholder = BUNGALOW_MIN_PRICE;
      break;
  }
}

const onTimeinChange = function () {
  timeoutElem.value = timeinElem.value;
}

const onTimeoutChange = function () {
  timeinElem.value = timeoutElem.value;
}

typeElem.addEventListener('change', onTypeChange);
timeinElem.addEventListener('change', onTimeinChange);
timeoutElem.addEventListener('change', onTimeoutChange);

onTypeChange();
onTimeinChange();

const updateAddress = ({lat, lng}) => {
  addressElem.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

export { disableNoticeForm, updateAddress };
