import Abstract from '../abstract';

const createTripFiltersHeaderTemplate = (filters) => {

  const createFiltersTemplate = () =>
    filters.map((filter) => `<div class="trip-filters__filter">
        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" 
                type="radio" name="trip-filter" value="${filter}">
        <label class="trip-filters__filter-label" for="filter-future">${filter}</label>
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
    this._filters = ['Everything', 'Future', 'Past'];
  }

  getTemplate() {
    return createTripFiltersHeaderTemplate(this._filters);
  }
}
