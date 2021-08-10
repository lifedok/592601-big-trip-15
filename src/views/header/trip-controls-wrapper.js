import {createElement} from '../../utils';


export default class TripControlsWrapperView {

  constructor() {
    this._element = null;
  }

  getTemplate() {
    return '<div class="trip-main__trip-controls  trip-controls"/>';
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
