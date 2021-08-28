import {generateTripDestinationData} from './trip-destination-data';
import {generateTripOfferData} from './trip-offer-data';
import {generateRandomBoolean, generateRandomString, getRandomInteger} from '../utils/common';
import {getDate} from '../utils/point';

const generateDateFrom = () => {
  const fromDaysGap = -1;

  const data = getDate().add(fromDaysGap, 'day')
    .add(getRandomInteger(5, 12), 'hour')
    .add(getRandomInteger(1, 30), 'minute');

  return getDate(data).toDate();
};

const generateDateTo = () => {
  const toDaysGap = 1;
  const data = getDate().add(toDaysGap, 'day')
    .add(getRandomInteger(12, 22), 'hour')
    .add(getRandomInteger(30, 60), 'minute');

  return getDate(data).toDate();
};

export const generateTripEventListData = (quantity) => {

  const item = () => ({
    basePrice: getRandomInteger(30, 600),
    dateFrom: generateDateFrom(),
    dateTo: generateDateTo(),
    destination: generateTripDestinationData(),
    id: generateRandomString(8, 15),
    isFavorite: generateRandomBoolean(0.7),
    ...generateTripOfferData(),
  });

  return new Array(quantity).fill().map(() => item());
};
