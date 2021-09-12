import Abstract from './abstract';
import {SORT_TYPES} from '../const';
import {remove} from '../utils/render';

const createPointSortTemplate = (sorts, points) => {

  const createSortTemplate = () => {

    const _getDisabledBySort = (sort) => (sort === SORT_TYPES.EVENT || sort === SORT_TYPES.OFFERS) ? 'disabled' : '';
    const _getDisabledByPointLength = () => (points.length <= 1) ? 'disabled' : '';
    return (
      sorts.map((sort) =>
        `<div class="trip-sort__item  trip-sort__item--${sort}">
          <input id="sort-${sort}" 
                 class="trip-sort__input  visually-hidden" 
                 type="radio" 
                 ${_getDisabledBySort(sort) || _getDisabledByPointLength()}
                 name="trip-sort" 
                 value="sort-${sort}">
          <label class="trip-sort__btn" for="sort-${sort}" data-sort-type=${sort}>${sort}</label>
        </div>`).join('')
    );
  };

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">

        ${createSortTemplate()}

    </form>
    `);
};

export default class PointSort extends Abstract {

  constructor(points) {
    super();
    this._points = points;
    this._sorts = Object.values(SORT_TYPES);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createPointSortTemplate(this._sorts, this._points);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }
    if (evt.target.dataset.sortType === SORT_TYPES.OFFERS || evt.target.dataset.sortType === SORT_TYPES.EVENT) {
      return;
    }

    evt.preventDefault();
    const parent = evt.target.parentElement;

    if(this._points.length <= 1) {
      parent.querySelector('input').disabled = true;
      return;
    }

    parent.querySelector('input').checked = true;
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }

}
