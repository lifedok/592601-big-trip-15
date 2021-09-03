// header
import TripInfoHeaderView from '../views/header/trip-info-header.js';
import TripControlsWrapperView from '../views/header/trip-controls-wrapper.js';
import TripTabsHeaderView from '../views/header/trip-tabs-header.js';
// import TripFiltersHeaderView from '../views/header/trip-filters-header';
import NewPointButtonView from '../views/header/new-point-button.js';

// main
import PointSortView from '../views/point-sort';
import PointListWrapperView from '../views/point-list-wrapper';
import PointPresenter from './point';

import PointNewPresenter from './point-new.js';
// service message
import ServiceMessage from '../views/service-message';
import {render, remove} from '../utils/render';
import {FILTER_TYPES, SORT_TYPES, UpdateType, UserAction} from '../const';
import {
  sortPointsByDay,
  sortPointsByPrice
} from '../utils/point';
import {filter} from '../utils/filter';


export default class Trip {

  constructor(tripHeaderView, tripMainView, pointsModel, filterModel) {
    this._tripHeaderView = tripHeaderView;
    this._tripMainView = tripMainView;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;

    this._pointPresenter = new Map();
    this._pointListWrapper = new PointListWrapperView();

    this._currentSortType = SORT_TYPES.TIME;
    this._filterType = FILTER_TYPES.EVERYTHING;

    this._pointSortView = null;
    // this._tripFiltersHeaderView = null;
    this._tripInfoHeaderView = null;
    this._noPointInTrip = null;
    // this._newPointButtonView = null;

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

  createPoint(callback) {
    this._pointNewPresenter.init(callback);
  }

  _getPoints() {
    this._filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[this._filterType](points);

    switch (this._currentSortType) {
      case SORT_TYPES.DAY:
        return filteredPoints.sort(sortPointsByDay);
      case SORT_TYPES.EVENT || SORT_TYPES.OFFERS:
        return;
      case SORT_TYPES.TIME: // by default
        return filteredPoints;
      case SORT_TYPES.PRICE:
        return filteredPoints.sort(sortPointsByPrice);
    }
    return filteredPoints;
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  // работа со вью
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

  // работа с моделью
  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR: // перерисовать весь список
        this._resetTrip();
        this._renderTrip();
        break;
      case UpdateType.MIDDLE: // перерисовать весь список
        this._pointPresenter.get(data.id).init(data);
        this._resetInfoHeader();
        this._renderInfoHeader();
        break;
      case UpdateType.MAJOR: // перерисовать вecь трип целиком
        this._resetTrip({resetSortType: true});
        this._resetInfoHeader();
        this._resetSort();

        this._renderSort();
        this._renderInfoHeader();
        render(this._tripMainView, this._pointListWrapper);
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
    if (this._tripInfoHeaderView !== null) {
      this._tripInfoHeaderView = null;
    }

    if (this._newPointButtonView !== null) {
      this._newPointButtonView = null;
    }

    this._controlsWrapperView = new TripControlsWrapperView();
    this._tripTabsHeaderView = new TripTabsHeaderView();
    if(this._getPoints().length) {
      this._tripInfoHeaderView = new TripInfoHeaderView(this._getPoints());
    } else {this._tripInfoHeaderView = new TripInfoHeaderView();}

    this._newPointButtonView = new NewPointButtonView();

    render(this._tripHeaderView, this._tripInfoHeaderView);

    // this._controlsWrapperView = new TripControlsWrapperView();
    // render(tripHeaderMainView, controlsWrapperView);
    // const tripTabsHeaderView = new TripTabsHeaderView();
    // render(controlsWrapperView, tripTabsHeaderView);


    render(this._tripHeaderView, this._controlsWrapperView);
    // render(this._controlsWrapperView, this._tripTabsHeaderView);
    // this._renderFilter();
    // render(this._tripHeaderView, this._newPointButtonView);
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
    const points = this._getPoints();
    const pointsLength = points.length;

    if (!pointsLength) {
      this._renderNoPointInTrip();
    } else {
      this._renderPointList(points);
    }
  }

  _renderPointList(pointList) {
    pointList.map((point) => this._renderPoint(point));
  }


  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointListWrapper, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _renderNoPointInTrip() {
    if (this._noPointInTrip !== null) {
      this._noPointInTrip = null;
    }

    this._noPointInTrip = new ServiceMessage('Click New Event to create your first point');
    render(this._pointListWrapper, this._noPointInTrip);
  }

  // _renderFilter() {
  //   if (this._tripFiltersHeaderView !== null) {
  //     this._tripFiltersHeaderView = null;
  //   }
  //
  //   this._tripFiltersHeaderView = new TripFiltersHeaderView();
  //   render(this._controlsWrapperView, this._tripFiltersHeaderView);
  // }


  // reset views
  _resetInfoHeader() {
    // remove(this._controlsWrapperView);
    // remove(this._tripFiltersHeaderView);
    remove(this._tripInfoHeaderView);
    // remove(this._newPointButtonView);
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

    if(resetSortType) {
      this._currentSortType = SORT_TYPES.TIME;
    }
  }

  _resetPointList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }
}
