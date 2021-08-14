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
import {render} from './utils';


const COUNT_ITEMS = 9;
const tripEventList = generateTripEventListData(COUNT_ITEMS);
tripEventList.sort((a, b) => a.dateFrom - b.dateFrom);

const pageBodyElement = document.querySelector('.page-body');


// create header
const tripMainHeader = pageBodyElement.querySelector('.trip-main');
render(tripMainHeader, new TripInfoHeaderView(tripEventList).getElement());

const ControlsWrapper = new TripControlsWrapperView();
render(tripMainHeader, ControlsWrapper.getElement());
render(ControlsWrapper.getElement(), new TripTabsHeaderView().getElement());
render(ControlsWrapper.getElement(), new TripFiltersHeaderView().getElement());
render(tripMainHeader, new NewEventButtonView().getElement());

// // create main content
const tripEvents = pageBodyElement.querySelector('.trip-events');
render(tripEvents, new TripEventSortView().getElement());
const listWrapper = new TripEventListWrapperView();
render(tripEvents, listWrapper.getElement());

const renderTripEvent = (tripEventListElement, tripEvent) => {
  const tripEventComponent = new TripEventItemView(tripEvent);
  const tripEventEditComponent = new TripEventModifyItemView(tripEvent, true);

  const replaceTripToEditForm = () => {
    tripEventListElement.replaceChild(tripEventEditComponent.getElement(), tripEventComponent.getElement());
  };

  const replaceFormToItem = () => {
    tripEventListElement.replaceChild(tripEventComponent.getElement(), tripEventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToItem();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  tripEventComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceTripToEditForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  const onTripEventEditClickEvent = (querySelector, typeEvent) =>
    tripEventEditComponent.getElement().querySelector(querySelector).addEventListener(typeEvent, (evt) => {
      evt.preventDefault();
      replaceFormToItem();
      document.removeEventListener('keydown', onEscKeyDown);
    });

  onTripEventEditClickEvent('.event__rollup-btn', 'click');
  onTripEventEditClickEvent('.event__reset-btn', 'click');
  onTripEventEditClickEvent('form', 'submit');

  render(tripEventListElement, tripEventComponent.getElement());
};

if (tripEventList.length) {
  tripEventList.map((item) =>
    renderTripEvent(listWrapper.getElement(), item),
  );
} else {
  render(tripEvents, new TripEventMsgView('Click New Event to create your first point').getElement());
}


