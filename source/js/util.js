const DEBOUNCE_INTERVAL = 500

const getRandomInt = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomFloat = (min, max, digits) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return parseFloat((Math.random() * (max - min) + min).toFixed(digits));
}

const getRandomArrayElem = (elements) => elements[getRandomInt(0, elements.length - 1)];

const shuffle = (arr, count = -1) => {
  if (count === 0) {
    return [];
  }

  let newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  if (count > 0 && count < newArr.length) {
    newArr.length = count;
  }
  return newArr;
}

const zfill = (num, places) => {
  const zeroesCount = places - num.toString().length;
  return zeroesCount > 0 ? (new Array(zeroesCount + 1)).join('0') + num : '' + num;
}

const isEscPressed = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const isEnterPressed = (evt) => {
  return evt.key === 'Enter';
};

const debounce = (cb) => {
  let lastTimeout = null;

  return (...args) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...args);
    }, DEBOUNCE_INTERVAL);
  };
};

export { getRandomInt, getRandomFloat, getRandomArrayElem, shuffle, zfill, isEscPressed, isEnterPressed, debounce };
