// header
import TripInfoHeaderView from '../views/header/trip-info-header.js';
import TripControlsWrapperView from '../views/header/trip-controls-wrapper.js';
import TripTabsHeaderView from '../views/header/trip-tabs-header.js';
import TripFiltersHeaderView from '../views/header/trip-filters-header';
import NewPointButtonView from '../views/header/new-point-button.js';

// main
import PointSortView from '../views/point-sort';
import PointListWrapperView from '../views/point-list-wrapper';
import PointPresenter from './point';

// service message
import ServiceMessage from '../views/service-message';
import {render} from '../utils/render';
import {updatePoint} from '../utils/common';
import {SORT_TYPES} from '../const';
import {
  sortPointsByDay,
  sortPointsByPrice
} from '../utils/point';


export default class Trip {
  constructor(tripHeaderView, tripMainView) {
    this._tripHeaderView = tripHeaderView;
    this._tripMainView = tripMainView;
    this._pointPresenter = new Map();

    this._currentSortType = SORT_TYPES.TIME;

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._pointListWrapper = new PointListWrapperView();
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(points) {
    this._points = points;

    this._defaultTripPoints = points.slice();


    this._renderHeader();
    this._renderSort();

    render(this._tripMainView, this._pointListWrapper);
    this._renderTrip();
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPointItem) {
    this._points = updatePoint(this._points, updatedPointItem);
    this._defaultTripPoints = updatePoint(this._defaultTripPoints, updatedPointItem);
    this._pointPresenter.get(updatedPointItem.id).init(updatedPointItem);
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SORT_TYPES.DAY:
        this._points.sort(sortPointsByDay);
        break;
      case SORT_TYPES.EVENT || SORT_TYPES.OFFERS:
        break;
      case SORT_TYPES.TIME:
        this._points = this._defaultTripPoints.slice();
        break;
      case SORT_TYPES.PRICE:
        this._points.sort(sortPointsByPrice);
        break;
      default:
        // by default we have point list like by sort time
        this._points = this._defaultTripPoints.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearPointList();
    this._renderPointList();
  }

  _renderSort() {
    this._pointSortView = new PointSortView();

    render(this._tripMainView, this._pointSortView);
    this._pointSortView.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilter() {
    render(this._controlsWrapperView, new TripFiltersHeaderView());
  }

  _renderPointList() {
    this._points.map((point) => this._renderPoint(point));
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointListWrapper, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _clearPointList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }

  _renderNoPointInTrip() {
    this._noPointInTrip = new ServiceMessage('Click New Event to create your first point');
    render(this._pointListWrapper, this._noPointInTrip);
  }

  _renderHeader() {
    this._controlsWrapperView = new TripControlsWrapperView();
    this._tripTabsHeaderView = new TripTabsHeaderView();


    render(this._tripHeaderView, new TripInfoHeaderView(this._points));
    render(this._tripHeaderView, this._controlsWrapperView);
    render(this._controlsWrapperView, this._tripTabsHeaderView);
    this._renderFilter();
    render(this._tripHeaderView, new NewPointButtonView());
  }

  _renderTrip() {
    if (!this._points.length) {
      this._renderNoPointInTrip();
    } else {
      this._renderPointList();
    }
  }
}
