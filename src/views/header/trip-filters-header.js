import Abstract from '../abstract';

const createTripFiltersHeaderTemplate = (filters, currentFilterType) => {

  const createFiltersTemplate = () =>
    filters.map((filterType) =>
      `<div class="trip-filters__filter">
        <input id="filter-${filterType.type}" 
               data-filter-type=${filterType.type}
               class="trip-filters__filter-input  visually-hidden" 
               type="radio" 
               ${filterType.type === currentFilterType ? 'checked' : ''}
               name="trip-filter" 
               value="${filterType.name}">
        <label class="trip-filters__filter-label" for="filter-${filterType.type}">${filterType.name}</label>
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

  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createTripFiltersHeaderTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }
}
