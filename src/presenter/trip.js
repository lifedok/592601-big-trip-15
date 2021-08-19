// header
import TripInfoHeaderView from '../views/header/trip-info-header.js';
import TripControlsWrapperView from '../views/header/trip-controls-wrapper.js';
import TripTabsHeaderView from '../views/header/trip-tabs-header.js';
import TripFiltersHeaderView from '../views/header/trip-filters-header';
import NewEventButtonView from '../views/header/new-event-button.js';

// main
import TripEventSortView from '../views/trip-event-sort';
import TripEventListWrapperView from '../views/trip-event-list-wrapper';
import TripEventModifyItemView from '../views/trip-event-modify-item';
import TripEventItemView from '../views/trip-event-item';

// warning message
import TripEventMsgView from '../views/trip-event-msg';
import {render, replace} from '../utils/render';


export default class Trip {
  constructor(tripEventsHeaderView, tripEventsMainView) {
    this._tripEventsHeaderView = tripEventsHeaderView;
    this._tripEventsMainView = tripEventsMainView;

    this._tripEventListWrapper = new TripEventListWrapperView();
  }

  init(tripEventList) {
    this._tripEventList = tripEventList;


    this._renderHeader();
    this._renderSort();

    render(this._tripEventsMainView, this._tripEventListWrapper);
    this._renderTrip();
  }

  _renderSort() {
    render(this._tripEventsMainView, new TripEventSortView());
  }

  _renderFilter() {
    render(this._controlsWrapperView, new TripFiltersHeaderView());
  }

  _renderEvents() {
    this._tripEventList.map((event) => this._renderEvent(event));
  }

  _renderEvent(event) {
    const tripEventEditComponent = new TripEventModifyItemView(event, true);
    const tripEventItemView = new TripEventItemView(event);

    const replaceTripToEditForm = () => {
      replace(tripEventEditComponent, tripEventItemView);
    };

    const replaceFormToItem = () => {
      replace(tripEventItemView, tripEventEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToItem();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const closeTripEventEditView = () => {
      replaceFormToItem();
      document.removeEventListener('keydown', onEscKeyDown);
    };

    tripEventItemView.setOpenClickHandler(() => {
      replaceTripToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    tripEventEditComponent.setCloseClickHandler(() => closeTripEventEditView());
    tripEventEditComponent.setResetClickHandler(() => closeTripEventEditView());
    tripEventEditComponent.setFormSubmitHandler(() => closeTripEventEditView());
    tripEventEditComponent.setSaveClickHandler(() => closeTripEventEditView());

    render(this._tripEventListWrapper, tripEventItemView);
  }

  _renderNoEventTrip() {
    this._noEventComponent = new TripEventMsgView('Click New Event to create your first point');
    render(this._tripEventListWrapper, this._noEventComponent);
  }

  _renderHeader() {
    this._controlsWrapperView = new TripControlsWrapperView();
    this._tripTabsHeaderView = new TripTabsHeaderView();


    render(this._tripEventsHeaderView, new TripInfoHeaderView(this._tripEventList));
    render(this._tripEventsHeaderView, this._controlsWrapperView);
    render(this._controlsWrapperView, this._tripTabsHeaderView);
    this._renderFilter();
    render(this._tripEventsHeaderView, new NewEventButtonView());
  }

  _renderTrip() {

    if (!this._tripEventList.length) {
      this._renderNoEventTrip();
    } else {
      this._renderEvents();
    }
  }
}
