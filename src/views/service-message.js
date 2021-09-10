import Abstract from './abstract';
import {FILTER_TYPES} from '../const';


const ServiceMessageTextType = {
  [FILTER_TYPES.EVERYTHING]: 'Click New Event to create your first point',
  [FILTER_TYPES.FUTURE]: 'There are no future events now',
  [FILTER_TYPES.PAST]: 'There are no past events now',
};

export default class ServiceMessage extends Abstract {

  constructor(filterType) {
    super();
    this._filterType = filterType;
  }

  getTemplate() {
    const serviceMessage = ServiceMessageTextType[this._filterType];
    return `<p class="trip-events__msg">${serviceMessage}</p>`;
  }
}
