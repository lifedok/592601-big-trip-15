import {generateTripDestinationData} from './trip-destination-data';
import {generateTripOfferData} from './trip-offer-data';
import {generateRandomBoolean, generateRandomString, getRandomInteger} from '../utils/common';
import {getDate} from '../utils/point';

const generateDateFrom = () => {
  const data = getDate().add(getRandomInteger(-1, -7), 'day')
    .add(getRandomInteger(0, 24), 'hour')
    .add(getRandomInteger(0, 60), 'minute');
  return getDate(data).toDate();
};

const generateDateTo = () => {
  const data = getDate().add(getRandomInteger(0, 7), 'day')
    .add(getRandomInteger(0, 24), 'hour')
    .add(getRandomInteger(0, 60), 'minute');
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
