import Abstract from '../abstract';
import {getFormatDate, sortPointsByDay, sortPointsByMaxDate} from '../../utils/point';


const createTripInfoHeaderTemplate = (listEvent) => {

  if (!listEvent || listEvent.length === 0) {
    return;
  }

  const minFromDate = listEvent.sort(sortPointsByDay)[0].dateFrom;
  const maxFromDate = listEvent.sort(sortPointsByMaxDate)[listEvent.length-1].dateTo;

  return (
    `<div class="trip-info__main">
      ${!listEvent || listEvent.length === 0 ? '' :
      `<h1 class="trip-info__title">${listEvent[0].destination.city} &mdash; ${listEvent[Math.floor(listEvent.length / 2)].destination.city} &mdash; ${listEvent[listEvent.length-1].destination.city}</h1>
         <p class="trip-info__dates">${getFormatDate(minFromDate, 'MMM D')}&nbsp;&mdash;&nbsp;${getFormatDate(maxFromDate, 'MMM D')}</p>
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
