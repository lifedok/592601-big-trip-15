import Abstract from '../abstract';
import {MenuItem, SortType} from '../../const';

const createTripTabsStatisticTemplate = () =>
  `<nav class="trip-controls__trip-tabs  trip-tabs">
       ${Object.values(SortType).map((type) => `<a class="trip-tabs__btn" href="#">${type}</a>`).join('')}
  </nav>`;

export default class TripTabStatisticHeader extends Abstract {

  constructor() {
    super();
    this._tabSortClickHandler = this._tabSortClickHandler.bind(this);
  }

  getTemplate() {
    return createTripTabsStatisticTemplate();
  }

  _tabSortClickHandler(evt) {
    evt.preventDefault();
    const value = evt.target.innerText;
    let chosenValue;

    if(value === SortType.TABLE) {
      chosenValue = MenuItem.POINTS;
      this.switchOnSelectTab(SortType.TABLE);
    } else {
      chosenValue = MenuItem.STATISTICS;
      this.switchOnSelectTab(SortType.STATS);
    }
    this._callback.menuClick(chosenValue);
  }

  setTabSortClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._tabSortClickHandler);
  }

  switchOnSelectTab(selectedTabType) {
    const values = this.getElement().querySelectorAll('a');

    values.forEach((value) => {
      value.innerText === selectedTabType && value.classList.add('trip-tabs__btn--active');
      value.innerText !== selectedTabType && value.classList.remove('trip-tabs__btn--active');
    });
  }
}
