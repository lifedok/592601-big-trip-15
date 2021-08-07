import dayjs from 'dayjs';
import {generateTripOfferData} from '../mock/trip-offer-data.js';
import {generateTripDestinationData} from '../mock/trip-destination-data.js';
import {generateRandomString, getRandomInteger, generateRandomBoolean} from '../utils';


const generateDateFrom = () => {
  const fromDaysGap = -7;
  const daysGap = getRandomInteger(fromDaysGap, 0);

  return dayjs().add(daysGap, 'day').toDate();
};

const generateDateTo = () => {
  const toDaysGap = 7;
  const daysGap = getRandomInteger(0, toDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};

export const generateTripEventListData = () => {
  const COUNT_ITEMS = 9;

  const dateFrom = generateDateFrom(); //'2019-07-10T22:55:56.845Z';
  const dateTo = generateDateTo(); //'2019-07-11T11:22:13.375Z';

  const item = () => ({
    basePrice: getRandomInteger(6, 15) * 100, // 1100,
    dateFrom: dateFrom, // '2019-07-10T22:55:56.845Z',
    dateTo: dateTo, //'2019-07-11T11:22:13.375Z',
    destination: generateTripDestinationData(),
    id: generateRandomString(8, 15),
    isFavorite: generateRandomBoolean(0.7),
    ...generateTripOfferData(),
  });


  return new Array(COUNT_ITEMS).fill().map(() => item());
};
