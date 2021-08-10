import {createElement} from '../utils';


export default class TripEventListWrapper {

  constructor() {
    this._element = null;
  }

  getTemplate() {
    return '<ul class="trip-events__list"/>';
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
