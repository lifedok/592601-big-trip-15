import {createElement} from '../utils';

export default class TripEventMsg {

  constructor(message) {
    this._message = message;
    this._element = null;
  }

  getTemplate() {
    return `<p class="trip-events__msg">${this._message}</p>`;
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
