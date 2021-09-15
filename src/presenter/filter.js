import FilterView from '../views/header/trip-filters-header';
import {render, replace, remove} from '../utils/render.js';
import {filter} from '../utils/filter.js';
import {UpdateType} from '../const.js';
import {FILTER_TYPES} from '../const';


export default class Filter {

  constructor(tripControlsWrapperView, filterModel, pointsModel) {
    this._tripControlsWrapperView = tripControlsWrapperView;
    this._filterModel = filterModel;
    this._pointsModel = pointsModel;

    this._filtersView = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterView = this._filtersView;

    this._filtersView = new FilterView(filters, this._filterModel.getFilter());
    this._filtersView.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterView === null) {
      render(this._tripControlsWrapperView, this._filtersView);  // create filters
      return;
    }
    replace(this._filtersView, prevFilterView);
    remove(prevFilterView);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const points = this._pointsModel.getPoints();
    return [
      {
        type: FILTER_TYPES.EVERYTHING,
        name: 'EVERYTHING',
        count: filter[FILTER_TYPES.EVERYTHING](points).length,
      },
      {
        type: FILTER_TYPES.FUTURE,
        name: 'FUTURE',
        count: filter[FILTER_TYPES.FUTURE](points).length,
      },
      {
        type: FILTER_TYPES.PAST,
        name: 'PAST',
        count: filter[FILTER_TYPES.PAST](points).length,
      },
    ];
  }

  isDisabledFilters() {
    this._filtersView.isDisabledFilter();
  }
}
