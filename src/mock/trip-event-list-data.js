import {generateTripOfferData} from '../mock/trip-offer-data.js';
import {generateTripDestinationData} from '../mock/trip-destination-data.js';
import {generateRandomString, getRandomInteger, generateRandomBoolean} from '../utils';


// const generateDateFrom = () => {
//
// };






export const generateTripEventListData = () => {
  const COUNT_ITEMS = 20;

  // const city = generateCity();
  // const description = generateDescription(city);
  // const pictures = new Array(COUNT_IMAGES).fill().map(() => generatePictures());


  const dateFrom = '2019-07-10T22:55:56.845Z';// generateDateFrom();
  const dateTo = '2019-07-11T11:22:13.375Z'; // generateDateTo();

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
