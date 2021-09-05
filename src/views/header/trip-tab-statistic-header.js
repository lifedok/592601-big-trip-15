import Abstract from '../abstract';

const createTripTabsStatisticTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
   </nav>`
);


export default class TripTabStatisticHeader extends Abstract {

  getTemplate() {
    return createTripTabsStatisticTemplate();
  }
}