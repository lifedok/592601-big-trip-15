import {OFFER_TITTLES, POINT_TYPES} from '../const.js';
import {getRandomInObj, getRandomInteger, generateRandomBoolean, generateRandomString} from '../utils/common';


const generateOffers = () => ({
  id: generateRandomString(8, 15),
  isChecked: generateRandomBoolean(0.3) ? 'checked' : '',
  title: getRandomInObj(OFFER_TITTLES),
  price: getRandomInteger(1.5, 9) * 10,
});

const getOfferType = () => {
  const randomIndex = getRandomInteger(0, POINT_TYPES.length - 1);
  return POINT_TYPES[randomIndex];
};


export const generateTripOfferData = () => {
  const type = getOfferType();

  const countOffers = getRandomInteger(0, 5);
  const offers = new Array(countOffers).fill().map(() => generateOffers());

  return {
    type,
    offers,
  };
};
