// header
import TripInfoHeaderView from './views/header/trip-info-header.js';
import TripControlsWrapperView from './views/header/trip-controls-wrapper.js';
import TripTabsHeaderView from './views/header/trip-tabs-header.js';
import TripFiltersHeaderView from './views/header/trip-filters-header';
import NewEventButtonView from './views/header/new-event-button.js';

// main
import TripEventSortView from './views/trip-event-sort.js';
import TripEventListWrapperView from './views/trip-event-list-wrapper.js';
import TripEventModifyItemView from './views/trip-event-modify-item.js';
import TripEventItemView from './views/trip-event-item.js';

// warning message
import TripEventMsgView from './views/trip-event-msg.js';


// generate mock data
import {generateTripEventListData} from './mock/trip-event-list-data.js';
import {render} from './utils/render';


const COUNT_ITEMS = 9;
const tripEventList = generateTripEventListData(COUNT_ITEMS);
tripEventList.sort((a, b) => a.dateFrom - b.dateFrom);

const pageBodyElement = document.querySelector('.page-body');


// create header
const tripMainHeader = pageBodyElement.querySelector('.trip-main');
render(tripMainHeader, new TripInfoHeaderView(tripEventList));

const ControlsWrapper = new TripControlsWrapperView();
render(tripMainHeader, ControlsWrapper);
render(ControlsWrapper, new TripTabsHeaderView());
render(ControlsWrapper, new TripFiltersHeaderView());
render(tripMainHeader, new NewEventButtonView());

// // create main content
const tripEvents = pageBodyElement.querySelector('.trip-events');
render(tripEvents, new TripEventSortView());
const listWrapper = new TripEventListWrapperView();
render(tripEvents, listWrapper);

const renderTripEvent = (tripEventListElement, tripEvent) => {
  const tripEventComponent = new TripEventItemView(tripEvent);
  const tripEventEditComponent = new TripEventModifyItemView(tripEvent, true);

  const replaceTripToEditForm = () => {
    tripEventListElement.replaceChild(tripEventEditComponent, tripEventComponent);
  };

  const replaceFormToItem = () => {
    tripEventListElement.replaceChild(tripEventComponent, tripEventEditComponent);
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

  tripEventComponent.setOpenClickHandler(() => {
    replaceTripToEditForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  tripEventEditComponent.setCloseClickHandler(() => closeTripEventEditView());
  tripEventEditComponent.setResetClickHandler(() => closeTripEventEditView());
  tripEventEditComponent.setFormSubmitHandler(() => closeTripEventEditView());
  tripEventEditComponent.setSaveClickHandler(() => closeTripEventEditView());

  render(tripEventListElement, tripEventComponent);
};


if (tripEventList.length) {
  tripEventList.map((item) =>
    renderTripEvent(listWrapper, item),
  );
} else {
  render(tripEvents, new TripEventMsgView('Click New Event to create your first point'));
}


