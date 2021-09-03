import Abstract from '../abstract';
import {FILTER_TYPES} from '../../const';

const createTripFiltersHeaderTemplate = (filters, currentFilterType) => {

  const createFiltersTemplate = () =>
    filters.map((filterType) =>
      `<div class="trip-filters__filter">
        <input id="filter-${filterType}" 
               data-filter-type=${filterType}
               class="trip-filters__filter-input  visually-hidden" 
               type="radio" 
               ${filterType === currentFilterType ? 'checked' : ''}
               name="trip-filter" 
               value="${filterType}">
        <label class="trip-filters__filter-label" for="filter-${filterType}">${filterType}</label>
      </div>`).join('');

  return (
    `<div class="trip-controls__filters">
      <h2 class="visually-hidden">Filter events</h2>
        <form class="trip-filters" action="#" method="get">
       
         ${createFiltersTemplate()}
  
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>    
  </div>
  `);
};

export default class TripFiltersHeader extends Abstract {

  constructor() {
    super();
    this._filters = Object.values(FILTER_TYPES);
  }

  getTemplate() {
    const currentFilterType = FILTER_TYPES.EVERYTHING;
    return createTripFiltersHeaderTemplate(this._filters, currentFilterType);
  }
}
