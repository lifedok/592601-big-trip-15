import Abstract from '../abstract';
import {getFormatDate} from '../../utils/point';


const createTripInfoHeaderTemplate = (listEvent) => {
  const dateFrom = !listEvent || listEvent.length === 0 ? '' :getFormatDate(listEvent[0].dateFrom, 'MMM D');
  const dateTo = !listEvent || listEvent.length === 0 ? '' : getFormatDate(listEvent[listEvent.length-1].dateTo, 'D');

  return (
    `<div class="trip-info__main">
      ${!listEvent || listEvent.length === 0 ? '' :
      `<h1 class="trip-info__title">${listEvent[0].destination.city} &mdash; ${listEvent[Math.floor(listEvent.length / 2)].destination.city} &mdash; ${listEvent[listEvent.length-1].destination.city}</h1>
         <p class="trip-info__dates">${dateFrom}&nbsp;&mdash;&nbsp;${dateTo}</p>
      `}
    </div>`);
};


export default class TripInfoHeader extends Abstract {

  constructor(listEvent) {
    super();
    this._listEvent = listEvent;
  }

  getTemplate() {
    return createTripInfoHeaderTemplate(this._listEvent);
  }
}
