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


export default class Trip {
  constructor(tripHeaderView, tripMainView) {
    this._tripHeaderView = tripHeaderView;
    this._tripMainView = tripMainView;
    this._pointPresenter = new Map();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._pointListWrapper = new PointListWrapperView();
  }

  init(points) {
    this._points = points;


    this._renderHeader();
    this._renderSort();

    render(this._tripMainView, this._pointListWrapper);
    this._renderTrip();
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._points = updatePoint(this._points, updatedPoint);
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _renderSort() {
    render(this._tripMainView, new PointSortView());
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
