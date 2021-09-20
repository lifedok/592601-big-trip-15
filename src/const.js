
export const FILTER_TYPES = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const SORT_TYPES = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

export const UpdateType = {
  PATCH: 'PATCH', // change type => update only point
  MINOR: 'MINOR', // change favorite => update list points
  MIDDLE: 'MIDDLE', // change date and city => update point and header
  MAJOR: 'MAJOR', // change add or delete point => update all points & header
  INIT: 'INIT',
  INIT_POINT: 'INIT_POINT',
  INIT_OFFERS: 'INIT_OFFERS',
  INIT_DESTINATIONS: 'INIT_DESTINATIONS',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};


export const MenuItem = {
  ADD_NEW_POINT: 'ADD_NEW_POINT',
  POINTS: 'POINTS',
  STATISTICS: 'STATISTICS',
};

export const SortType = {
  TABLE: 'Table',
  STATS: 'Stats',
};

export const ITEM_BLANK = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: {
    city: '',
    description: ' ',
    pictures: [
      {
        src: ' ',
        description: ' ',
      },
    ],
  },
  isFavorite: false,
  offers: null,
  type: 'drive',
};
