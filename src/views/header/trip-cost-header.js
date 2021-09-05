import Abstract from '../abstract';

const tripCostHeaderTemplate = (listEvent) => {
  const total = () => !listEvent || listEvent.length === 0 ? '' : listEvent.reduce((prev, curr) => prev + curr.basePrice, 0);
  return (`<p class="trip-info__cost">Total: &euro;&nbsp;<span class="trip-info__cost-value">${total()}</span></p>`);
};


export default class TripCostHeader extends Abstract {

  constructor(listEvent) {
    super();
    this._listEvent = listEvent;
  }

  getTemplate() {
    return tripCostHeaderTemplate(this._listEvent);
  }
}
