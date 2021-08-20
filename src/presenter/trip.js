// header
import TripInfoHeaderView from '../views/header/trip-info-header.js';
import TripControlsWrapperView from '../views/header/trip-controls-wrapper.js';
import TripTabsHeaderView from '../views/header/trip-tabs-header.js';
import TripFiltersHeaderView from '../views/header/trip-filters-header';
import NewPointButtonView from '../views/header/new-point-button.js';

// main
import PointSortView from '../views/point-sort';
import PointListWrapperView from '../views/point-list-wrapper';
import PointItemModifyView from '../views/point-item-modify';
import PointItemView from '../views/point-item';
import PointPresenter from './point';

// service message
import ServiceMessage from '../views/service-message';
import {render, replace} from '../utils/render';


export default class Trip {
  constructor(tripHeaderView, tripMainView) {
    this._tripHeaderView = tripHeaderView;
    this._tripMainView = tripMainView;

    this._pointListWrapper = new PointListWrapperView();
  }

  init(points) {
    this._points = points;


    this._renderHeader();
    this._renderSort();

    render(this._tripMainView, this._pointListWrapper);
    this._renderTrip();
  }

  _renderSort() {
    render(this._tripMainView, new PointSortView());
  }

  _renderFilter() {
    render(this._controlsWrapperView, new TripFiltersHeaderView());
  }

  _renderPoints() {
    this._points.map((point) => this._renderPoint(point));
  }

  _renderPoint(point) {
    const pointEditComponent = new PointItemModifyView(point, true);
    const pointItemView = new PointItemView(point);

    const replacePointToEditForm = () => {
      replace(pointEditComponent, pointItemView);
    };

    const replaceFormToPointItem = () => {
      replace(pointItemView, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPointItem();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const closeTripPointEditView = () => {
      replaceFormToPointItem();
      document.removeEventListener('keydown', onEscKeyDown);
    };

    pointItemView.setOpenClickHandler(() => {
      //  закрыть все евенты путешествий
      this._renderPoints();

      // и потом открыть одну нужную.
      replacePointToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointItemView.setIsFavoriteClickHandler(() => {
      point.isFavorite = !point.isFavorite;
      return new PointItemView(...point);
    });

    pointEditComponent.setCloseClickHandler(() => closeTripPointEditView());
    pointEditComponent.setResetClickHandler(() => closeTripPointEditView());
    pointEditComponent.setFormSubmitHandler(() => closeTripPointEditView());
    pointEditComponent.setSaveClickHandler(() => closeTripPointEditView());

    render(this._pointListWrapper, pointItemView);

    // const pointPresenter = new PointPresenter(this._pointListWrapper);
    // pointPresenter.init(point);
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
      this._renderPoints();
    }
  }
}
