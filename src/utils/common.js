
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomInObj = (obj) => {
  const renderKeyIndex = Math.floor(Math.random() * Object.keys(obj).length);
  return Object.keys(obj)[renderKeyIndex];
};

export const generateRandomString = (minLength, maxLength) => {
  const symbols = 'qwertyuiopasdfghjklzxcvbnm';
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function getRandomStr(len) {
    let result = '';
    for (let i = 0; i < len; i++)
    {result += symbols[getRandomIntInclusive(0, symbols.length - 1)];}
    return result;
  }
  return getRandomStr(getRandomIntInclusive(minLength, maxLength));
};


export const generateRandomBoolean = (probability) => Math.random() < probability;

export const capitalizeFirstLetter = (string) => string[0].toUpperCase() + string.slice(1);

export const updatePoint = (points, update) => {
  const index = points.findIndex((point) => point.id === update.id);

  if (index === -1) {
    return points;
  }

  return [
    ...points.slice(0, index),
    update,
    ...points.slice(index + 1),
  ];
};