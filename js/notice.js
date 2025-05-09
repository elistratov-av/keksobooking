const MAX_PRICE = 1000000;
const PALACE_MIN_PRICE = 10000;
const FLAT_MIN_PRICE = 1000;
const HOUSE_MIN_PRICE = 5000;
const HOTEL_MIN_PRICE = 3000;
const BUNGALOW_MIN_PRICE = 0;

const noticeForm = document.querySelector('.ad-form');
const typeElement = noticeForm.querySelector('#type');
const priceElement = noticeForm.querySelector('#price');
const timeinElement = noticeForm.querySelector('#timein');
const timeoutElement = noticeForm.querySelector('#timeout');

const onTypeChange = function () {
  const type = typeElement.value;

  priceElement.max = MAX_PRICE;
  switch (type) {
    case 'palace':
      priceElement.min = PALACE_MIN_PRICE;
      priceElement.placeholder = PALACE_MIN_PRICE;
      break;
    case 'flat':
      priceElement.min = FLAT_MIN_PRICE;
      priceElement.placeholder = FLAT_MIN_PRICE;
      break;
    case 'house':
      priceElement.min = HOUSE_MIN_PRICE;
      priceElement.placeholder = HOUSE_MIN_PRICE;
      break;
    case 'hotel':
      priceElement.min = HOTEL_MIN_PRICE;
      priceElement.placeholder = HOTEL_MIN_PRICE;
      break;
    case 'bungalow':
      priceElement.min = BUNGALOW_MIN_PRICE;
      priceElement.placeholder = BUNGALOW_MIN_PRICE;
      break;
  }
}

const onTimeinChange = function () {
  timeoutElement.value = timeinElement.value;
}

const onTimeoutChange = function () {
  timeinElement.value = timeoutElement.value;
}

typeElement.addEventListener('change', onTypeChange);
timeinElement.addEventListener('change', onTimeinChange);
timeoutElement.addEventListener('change', onTimeoutChange);

onTypeChange();
onTimeinChange();
