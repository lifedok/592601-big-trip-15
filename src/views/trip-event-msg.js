import Abstract from './abstract';

export default class TripEventMsg extends Abstract {

  constructor(message) {
    super();
    this._message = message;
  }

  getTemplate() {
    return `<p class="trip-events__msg">${this._message}</p>`;
  }
}
