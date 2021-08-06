import {getRandomInteger} from '../utils.js';
import {getRandomInObj} from '../utils.js';
import {OFFER_TITTLES, POINTS_TYPE} from '../const.js';


const generateOffers = () => ({
  title: getRandomInObj(OFFER_TITTLES),  //TODO: generate a unique array with non-repeating properties.
  price: getRandomInteger(1.5, 9) * 10,
});

const getOfferType = () => {
  const randomIndex = getRandomInteger(0, POINTS_TYPE.length - 1);
  return POINTS_TYPE[randomIndex];
};


export const generateTripOfferData = () => {
  const COUNT_OFFERS = 5;

  const type = getOfferType();

  const offers = new Array(COUNT_OFFERS).fill().map(() => generateOffers());

  return {
    type: type,
    offers,
  };
};
