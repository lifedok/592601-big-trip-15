import Abstract from './abstract';

const createPointSortTemplate = (sorts) => {

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

export default class PointSort extends Abstract {

  constructor() {
    super();
    this._sorts = ['Day', 'Event', 'Time', 'Price', 'Offers'];
  }

  getTemplate() {
    return createPointSortTemplate(this._sorts);
  }
}
