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

getRandomInt(2, 5);
getRandomFloat(1.1, 4.7, 2);
