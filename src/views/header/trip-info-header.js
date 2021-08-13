import {createElement} from '../../utils';


const createTripInfoHeaderTemplate = (listEvent) => {

  const total = () => listEvent.reduce((prev, curr) => prev + curr.basePrice, 0);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${listEvent[0].destination.city} &mdash; ${listEvent[Math.floor(listEvent.length / 2)].destination.city} &mdash; ${listEvent[listEvent.length-1].destination.city}</h1>

        <p class="trip-info__dates">${listEvent[0].dateFrom.format('MMM D')}&nbsp;&mdash;&nbsp;${listEvent[listEvent.length-1].dateTo.format('D')}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${total()}</span>
      </p>
  </section>
  `);
};


export default class TripInfoHeader {

  constructor(listEvent) {
    this._listEvent = listEvent;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoHeaderTemplate(this._listEvent);
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
