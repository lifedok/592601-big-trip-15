// header
import TripInfoHeaderView from './views/header/trip-info-header.js';
import TripControlsWrapperView from './views/header/trip-controls-wrapper.js';
import TripTabsHeaderView from './views/header/trip-tabs-header.js';
// import {TripFilterHeaderView} from './views/header/trip-filters-header.js';
import { createTripFilterHeaderTemplate } from './views/header/trip-filters-header.js';
import NewEventButtonView from './views/header/btn-new-event.js';

// main
import {createTripEventsSortTemplate} from './views/trip-events-sort.js';
import {createTripEventListWrapperTemplate} from './views/trip-events-list-wrapper.js';
import {createTripModifyItemTemplate} from './views/trip-event-modify-item.js';
import {createTripEventItemTemplate} from './views/trip-event-item.js';
// import TripEventItemView from './views/trip-event-item.js';

// generate mock data
import {generateTripEventListData} from './mock/trip-event-list-data.js';
import {renderTemplate, render} from './utils';


const COUNT_ITEMS = 9;
const tripEventList = generateTripEventListData(COUNT_ITEMS);
tripEventList.sort((a, b) => a.dateFrom - b.dateFrom);

const pageBodyElement = document.querySelector('.page-body');


// create header
const tripMainHeader = pageBodyElement.querySelector('.trip-main');
render(tripMainHeader, new TripInfoHeaderView(tripEventList).getElement());
render(tripMainHeader, new TripControlsWrapperView().getElement());


const tripMainControls = pageBodyElement.querySelector('.trip-main__trip-controls');
render(tripMainControls, new TripTabsHeaderView().getElement());
// renderTemplate(tripMainControls, new TripFilterHeaderView().getElement());
// tripMainControls.insertAdjacentHTML('beforeend', createTripFilterHeaderTemplate());
renderTemplate(tripMainControls, createTripFilterHeaderTemplate(), 'beforeend');
render(tripMainHeader, new NewEventButtonView().getElement());

// create main content
const pageMainElement = pageBodyElement.querySelector('.trip-events');
renderTemplate(pageMainElement, createTripEventsSortTemplate(), 'beforeend');
renderTemplate(pageMainElement, createTripEventListWrapperTemplate(), 'beforeend');

const eventList = pageBodyElement.querySelector('.trip-events__list');

if (tripEventList.length) {
  renderTemplate(eventList, createTripModifyItemTemplate(tripEventList[0], true), 'beforeend');
  tripEventList.map((item) =>
    renderTemplate(eventList, createTripEventItemTemplate(item), 'beforeend'),
    // render(eventList, new TripEventItemView(item).getElement(), RenderPosition.BEFOREEND),
  );
} else {
  pageBodyElement.querySelector('.trip-events__msg').textContent('Click New Event to create your first point');
}


