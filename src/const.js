export const OFFER_TITTLES = {
  'Add luggage': 'luggage',
  'Switch to comfort class': 'comfort',
  'Add meal': 'meal',
  'Choose seats': 'seats',
  'Travel by train': 'train',
  'Order Uber': 'uber',
};

export const POINT_TYPES = [
  'taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant',
];

export const CITIES = ['Geneva', 'Berlin', 'Athens', 'Tallinn', 'Riga', 'Vologda'];

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
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

