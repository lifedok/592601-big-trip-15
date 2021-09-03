import FilterView from '../views/header/trip-filters-header';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import {filter} from '../utils/filter.js';
import {UpdateType} from '../const.js';
import {FILTER_TYPES} from '../const';
import TripTabsHeaderView from '../views/header/trip-tabs-header.js';


export default class Filter {

  constructor(filtersWrapperView, filterModel, pointsModel) {
    this._filtersWrapperView = filtersWrapperView;
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
      console.log('TEST ===? _filtersView', this._filtersView);

      console.log('TEST ===_filterWrapperView', this._filtersWrapperView);
      // this._controlsWrapperView = new TripControlsWrapperView();


      // render(this._tripHeaderView, this._controlsWrapperView);
      // render(this._controlsWrapperView, this._tripTabsHeaderView, RenderPosition.AFTERBEGIN);
      // render(this._filtersWrapperView, this._tripTabsHeaderView);
      render(this._filtersWrapperView, this._filtersView);
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
}
