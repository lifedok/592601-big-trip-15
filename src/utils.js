import dayjs from 'dayjs';


export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const customDate = (date) => dayjs(date).format('D MMMM');

export const getRandomInObj = (obj) => {
  const renderKeyIndex = Math.floor(Math.random() * Object.keys(obj).length);
  return Object.keys(obj)[renderKeyIndex];
};
