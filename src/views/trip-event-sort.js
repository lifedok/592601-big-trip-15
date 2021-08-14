import {createElement} from '../utils';

const createTripEventSortTemplate = (sorts) => {

  const createSortTemplate = () =>
    sorts.map((sort) => `
    <div class="trip-sort__item  trip-sort__item--${sort.toLowerCase()}">
      <input id="sort-day" class="trip-sort__input  visually-hidden" 
             type="radio" name="trip-sort" value="sort-${sort.toLowerCase()}">
      <label class="trip-sort__btn" for="sort-${sort.toLowerCase()}">${sort}</label>
    </div>`).join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">

        ${createSortTemplate()}

    </form>
    `);
};

export default class TripEventSort {

  constructor() {
    this._sorts = ['Day', 'Event', 'Time', 'Price', 'Offers'];
    this._element = null;
  }

  getTemplate() {
    return createTripEventSortTemplate(this._sorts);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}