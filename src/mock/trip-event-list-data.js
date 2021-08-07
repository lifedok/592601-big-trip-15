import dayjs from 'dayjs';
import {generateTripOfferData} from '../mock/trip-offer-data.js';
import {generateTripDestinationData} from '../mock/trip-destination-data.js';
import {generateRandomString, getRandomInteger, generateRandomBoolean} from '../utils';


const generateDateFrom = () => {
  const fromDaysGap = -1;
  return dayjs().add(fromDaysGap, 'day')
    .add(getRandomInteger(5, 12), 'hour')
    .add(getRandomInteger(1, 30), 'minute');
};

const generateDateTo = () => {
  const toDaysGap = 1;
  return dayjs().add(toDaysGap, 'day')
    .add(getRandomInteger(12, 22), 'hour')
    .add(getRandomInteger(30, 60), 'minute');
};

export const generateTripEventListData = () => {
  const COUNT_ITEMS = 9;

  const item = () => ({
    basePrice: getRandomInteger(6, 15) * 100, // 1100,
    dateFrom: generateDateFrom(),
    dateTo: generateDateTo(),
    destination: generateTripDestinationData(),
    id: generateRandomString(8, 15),
    isFavorite: generateRandomBoolean(0.7),
    ...generateTripOfferData(),
  });


  return new Array(COUNT_ITEMS).fill().map(() => item());
};
