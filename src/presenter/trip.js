// header
import TripInfoHeaderView from '../views/header/trip-info-header.js';
import TripCostHeaderView from '../views/header/trip-cost-header.js';

// main
import PointSortView from '../views/point-sort';
import PointListWrapperView from '../views/point-list-wrapper';
import PointPresenter, {State as PointPresenterViewState} from './point';

import PointNewPresenter from './point-new.js';
// service message
import ServiceMessage from '../views/service-message';
import LoadingView from '../views/loading.js';
import {render, remove} from '../utils/render';
import {FILTER_TYPES, SORT_TYPES, UpdateType, UserAction} from '../const';
import {sortPointsByDay, sortPointsByPrice, sortPointsByTime} from '../utils/point';
import {filter} from '../utils/filter';

export default class Trip {

  constructor(tripControlsWrapperView, tripMainView, pointsModel, filterModel, api, offersModel, destinationsModel) {
    this._tripControlsWrapperView = tripControlsWrapperView;
    this._tripMainView = tripMainView;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._api = api;
    this._isLoading = true;

    this._pointPresenter = new Map();
    this._pointListWrapper = new PointListWrapperView();

    this._currentSortType = SORT_TYPES.DAY;
    this._filterType = FILTER_TYPES.EVERYTHING;

    this._pointSortView = null;
    this._tripInfoHeaderView = null;
    this._tripCostHeaderView = null;
    this._noPointInTrip = null;
    this._loadingComponent = new LoadingView();

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);

    this._pointNewPresenter = new PointNewPresenter(this._pointListWrapper, this._handleViewAction);
  }

  init() {
    this._renderInfoHeader();
    this._renderSort();
    render(this._tripMainView, this._pointListWrapper);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._offersModel.addObserver(this._handleModelEvent);
    this._destinationsModel.addObserver(this._handleModelEvent);

    this._renderTrip();
  }

  destroy() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
    this._resetTrip({resetInfoHeader: true, resetSortType: true});

    remove(this._pointListWrapper);
    remove(this._tripMainView);

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  removeTripContent() {
    this._resetTrip({resetSortType: false});
    this._resetSort();
  }

  createTripContent() {
    this._renderSort();
    render(this._tripMainView, this._pointListWrapper);
    this._renderTrip();
  }

  setDefaultModeFilters() {
    this._currentSortType = SORT_TYPES.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FILTER_TYPES.EVERYTHING);
  }

  createPoint() {
    this._offers = this._offersModel.getOffers();
    this._destinations = this._destinationsModel.getDestinations();
    this.setDefaultModeFilters();
    this._pointNewPresenter.init(this._offers, this._destinations);
  }

  _getPoints() {
    this._filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[this._filterType](points);

    const filteredPointsByDay = filteredPoints.sort(sortPointsByDay);
    switch (this._currentSortType) {
      case SORT_TYPES.DAY: // by default
        return filteredPointsByDay;
      case SORT_TYPES.EVENT || SORT_TYPES.OFFERS:
        return;
      case SORT_TYPES.TIME:
        return filteredPoints.sort(sortPointsByTime);
      case SORT_TYPES.PRICE:
        return filteredPoints.sort(sortPointsByPrice);
    }
    return filteredPointsByDay;
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  // работа со вью
  _handleViewAction(actionType, updateType, updatePoint) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointPresenter.get(updatePoint.id).setViewState(PointPresenterViewState.SAVING);
        this._api.updateFetchPoint(updatePoint)
          .then((response) => {
            this._pointsModel.updatePoint(updateType, response);
          }).catch(() => {
            this._pointPresenter.get(updatePoint.id).setViewState(PointPresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_POINT:
        this._pointNewPresenter.setSaving();
        this._api.addFetchPoint(updatePoint)
          .then((response) => {
            this._pointsModel.addPoint(updateType, response);
          })
          .catch(() => {
            this._pointNewPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_POINT:
        this._pointPresenter.get(updatePoint.id).setViewState(PointPresenterViewState.DELETING);
        this._api.deleteFetchPoint(updatePoint)
          .then(() => {
            this._pointsModel.deletePoint(updateType, updatePoint);
          })
          .catch(() => {
            this._pointPresenter.get(updatePoint.id).setViewState(PointPresenterViewState.ABORTING);
          });
        break;
    }
  }

  // работа с моделью
  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter.get(data.id).init(data, this._offers, this._destinations);
        break;
      case UpdateType.MINOR: // перерисовать весь список
        this._resetTrip();
        this._renderTrip();
        break;
      case UpdateType.MIDDLE: // перерисовать info in header
        this._pointPresenter.get(data.id).init(data, this._offers, this._destinations);
        this._resetInfoHeader();
        this._renderInfoHeader();
        break;
      case UpdateType.MAJOR: // перерисовать вecь трип целиком
        this._resetTrip({resetSortType: false});
        this._resetInfoHeader();
        this._resetSort();

        this._renderSort();
        this._renderInfoHeader();
        render(this._tripMainView, this._pointListWrapper);
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderInfoHeader();
        this._renderTrip();
        break;
      case UpdateType.INIT_OFFERS:
        this._renderTrip();
        break;
      case UpdateType.INIT_DESTINATIONS:
        this._renderTrip();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._resetPointList();
    this._renderTrip();
  }


  // render views
  _renderInfoHeader() {
    if (this._isLoading) {
      return;
    }
    this._tripInfoHeaderView = new TripInfoHeaderView(this._getPoints());
    this._tripCostHeaderView = new TripCostHeaderView(this._getPoints());

    render(this._tripControlsWrapperView, this._tripInfoHeaderView);
    render(this._tripControlsWrapperView, this._tripCostHeaderView);
  }

  _renderSort() {
    if (this._pointSortView !== null) {
      this._pointSortView = null;
    }

    this._pointSortView = new PointSortView(this._getPoints());
    render(this._tripMainView, this._pointSortView);
    this._pointSortView.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const points = this._getPoints();
    const pointsLength = points.length;

    if (!pointsLength) {
      this._renderNoPointInTrip();
    } else {
      this._currentSortType === SORT_TYPES.DAY ? this._renderPointList(points.sort(sortPointsByDay)) : this._renderPointList(points);
    }
  }

  _renderPointList(pointList) {
    pointList.map((point) => this._renderPoint(point));
  }


  _renderPoint(point) {
    this._offers = this._offersModel.getOffers();
    this._destinations = this._destinationsModel.getDestinations();
    const pointPresenter = new PointPresenter(this._pointListWrapper, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point, this._offers, this._destinations);
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _renderNoPointInTrip() {
    if (this._noPointInTrip !== null) {
      this._noPointInTrip = null;
    }

    this._noPointInTrip = new ServiceMessage(this._filterType);
    render(this._pointListWrapper, this._noPointInTrip);
  }

  // reset views
  _resetInfoHeader() {
    remove(this._tripInfoHeaderView);
    remove(this._tripCostHeaderView);
  }

  _resetSort() {
    remove(this._pointSortView);
  }

  _resetTrip({resetSortType = false} = {}) {
    this._pointNewPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();

    if (this._noPointInTrip) {
      remove(this._noPointInTrip);
    }

    if (this._loadingComponent) {
      remove(this._loadingComponent);
    }

    if (resetSortType) {
      this._currentSortType = SORT_TYPES.DAY;
    }
  }

  _renderLoading() {
    render(this._pointListWrapper, this._loadingComponent);
  }

  _resetPointList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }
}
