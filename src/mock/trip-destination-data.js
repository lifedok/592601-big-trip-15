import {getRandomInteger, generateRandomBoolean} from '../utils.js';
import {CITIES} from '../const';

const generateCity = () => {
  const randomIndex = getRandomInteger(0, CITIES.length - 1);
  return CITIES[randomIndex];
};

const generateDescription = (name) => {
  const descriptions = [
    `${name}, is a beautiful city, a true asian pearl, with crowded streets.`,
    `${name} is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.`,
    `${name} ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
    `${name} id orci ut lectus varius viverra.`,
    `${name} nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `${name} erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
    '',
  ];
  const randomIndex = getRandomInteger(0, descriptions.length - 1);
  return descriptions[randomIndex];
};


const generatePictures = () => {

  const getSrc = () => {
    const isShow = generateRandomBoolean(0.5);
    const number = getRandomInteger(0, 100);
    return isShow ? `http://picsum.photos/248/152?r=${number}` : '';
  };

  const getImageDescription = () => {
    const descriptions = [
      'Chamonix parliament building', 'description 2', 'description 3', 'description 4', 'description 5', '',
    ];
    const randomIndex = getRandomInteger(0, descriptions.length - 1);
    return descriptions[randomIndex];
  };

  return {
    src: getSrc(),
    description: getImageDescription(),
  };
};


export const generateTripDestinationData = () => {
  const COUNT_IMAGES = 7;

  const city = generateCity();
  const description = generateDescription(city);
  const pictures = new Array(COUNT_IMAGES).fill().map(() => generatePictures());

  return {
    description,
    city,
    pictures,
  };
};
