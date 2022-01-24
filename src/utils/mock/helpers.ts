function getRandomIntegerNumber(minValue = 0, maxValue = 1) {
  if (minValue === maxValue) {
    return minValue;
  }

  let min = minValue;
  let max = maxValue;

  if (min > max) {
    [min, max] = [max, min];
  }

  return min + Math.floor(Math.random() * (max - min  + 1));
}

export {
  getRandomIntegerNumber
};
