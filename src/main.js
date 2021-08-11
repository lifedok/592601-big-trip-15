// header
import TripInfoHeaderView from './views/header/trip-info-header.js';
import TripControlsWrapperView from './views/header/trip-controls-wrapper.js';
import TripTabsHeaderView from './views/header/trip-tabs-header.js';
import TripFilterHeaderView from './views/header/trip-filters-header';
import NewEventButtonView from './views/header/btn-new-event.js';

// main
import TripEventsSortView from './views/trip-events-sort.js';
import TripEventListWrapperView from './views/trip-events-list-wrapper.js';
import TripModifyItemView from './views/trip-event-modify-item.js';
import TripEventItemView from './views/trip-event-item.js';

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
render(ControlsWrapper.getElement(), new TripFilterHeaderView().getElement());
render(tripMainHeader, new NewEventButtonView().getElement());

// // create main content
const pageMainElement = pageBodyElement.querySelector('.trip-events');
render(pageMainElement, new TripEventsSortView().getElement());
const listWrapper = new TripEventListWrapperView();
render(pageMainElement, listWrapper.getElement());

const renderTripEvent = (tripEventListElement, tripEvent) => {
  const tripEventComponent = new TripEventItemView(tripEvent);
  const tripEventEditComponent = new TripModifyItemView(tripEvent, true);

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

  tripEventEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToItem();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(tripEventListElement, tripEventComponent.getElement());
};

if (tripEventList.length) {
  // render(listWrapper.getElement(), new TripModifyItemView(tripEventList[0], true).getElement());
  tripEventList.map((item) =>
    renderTripEvent(listWrapper.getElement(), item),
  );
} else {
  pageBodyElement.querySelector('.trip-events__msg').textContent('Click New Event to create your first point');
}


