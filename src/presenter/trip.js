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
import {SORT_TYPES, UpdateType, UserAction} from '../const';
import {
  sortPointsByDay,
  sortPointsByPrice
} from '../utils/point';


export default class Trip {

  constructor(tripHeaderView, tripMainView, pointsModel) {
    this._tripHeaderView = tripHeaderView;
    this._tripMainView = tripMainView;
    this._pointsModel = pointsModel;
    this._pointPresenter = new Map();

    this._currentSortType = SORT_TYPES.TIME;

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._pointListWrapper = new PointListWrapperView();
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
  }

  init() {
    this._renderHeader();
    this._renderSort();
    render(this._tripMainView, this._pointListWrapper);
    this._renderTrip();
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SORT_TYPES.DAY:
        return this._pointsModel.getPoints().slice().sort(sortPointsByDay);
      case SORT_TYPES.EVENT || SORT_TYPES.OFFERS:
        return;
      case SORT_TYPES.TIME: // by default
        return this._pointsModel.getPoints().slice();
      case SORT_TYPES.PRICE:
        return this._pointsModel.getPoints().slice().sort(sortPointsByPrice);
    }
    return this._pointsModel.getPoints();
  }

  _handleModeChange() {
    // this._taskNewPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updateType, updatedPoint) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter.get(updatedPoint.id).init(updatedPoint);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetRenderedTaskCount: true, resetSortType: true});
        this._renderTrip();
        break;
    }
  }

  _handleViewAction(actionType, updateType, updatePoint) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, updatePoint);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, updatePoint);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, updatePoint);
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearPointList();
    this._renderTrip();
  }

  _renderSort() {
    this._pointSortView = new PointSortView();

    render(this._tripMainView, this._pointSortView);
    this._pointSortView.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilter() {
    render(this._controlsWrapperView, new TripFiltersHeaderView());
  }

  _renderPointList(pointList) {
    pointList.map((point) => this._renderPoint(point));
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

    render(this._tripHeaderView, new TripInfoHeaderView(this._getPoints()));
    render(this._tripHeaderView, this._controlsWrapperView);
    render(this._controlsWrapperView, this._tripTabsHeaderView);
    this._renderFilter();
    render(this._tripHeaderView, new NewPointButtonView());
  }

  _clearTrip({resetRenderedPoint = false, resetSortType = false} = {}) {
    console.log('_clearTrip', resetRenderedPoint, resetSortType);
  }

  _renderTrip() {
    const points = this._getPoints();
    const pointsLength = points.length;

    if (!pointsLength) {
      this._renderNoPointInTrip();
    } else {
      this._renderPointList(points);
    }
  }
}
