
// header
import {createTripInfoHeaderTemplate} from './views/header/trip-info-header.js';
import {createTripControlsWrapperTemplate} from './views/header/trip-controls-wrapper.js';
import {createTripTabsHeaderTemplate} from './views/header/trip-tabs-header.js';
import {createTripFilterHeaderTemplate} from './views/header/trip-filters-header.js';
import {createNewEventButtonTemplate} from './views/header/btn-new-event.js';

// main
import {createTripEventsSortTemplate} from './views/trip-events-sort.js';
import {createTripEventListWrapperTemplate} from './views/trip-events-list-wrapper.js';
import {createTripModifyItemTemplate} from './views/trip-event-modify-item.js';
import {createTripEventItemTemplate} from './views/trip-event-item.js';

// generate mock data
import {generateTripDestinationData} from './mock/trip-destination-data.js';
import {generateTripOfferData} from './mock/trip-offer-data.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const NUMBER_OF_TRIPS = 5;

const tripOffer = new Array(1).fill(generateTripOfferData());

const tripDestination = new Array(1).fill(generateTripDestinationData());

const pageBodyElement = document.querySelector('.page-body');

// create header
const tripMainHeader = pageBodyElement.querySelector('.trip-main');
render(tripMainHeader, createTripInfoHeaderTemplate(), 'beforeend');
render(tripMainHeader, createTripControlsWrapperTemplate(), 'beforeend');

const tripMainControls = pageBodyElement.querySelector('.trip-main__trip-controls');
render(tripMainControls, createTripTabsHeaderTemplate(), 'beforeend');
render(tripMainControls, createTripFilterHeaderTemplate(), 'beforeend');
render(tripMainHeader, createNewEventButtonTemplate(), 'beforeend');

// create main content
const pageMainElement = pageBodyElement.querySelector('.trip-events');
render(pageMainElement, createTripEventsSortTemplate(), 'beforeend');
render(pageMainElement, createTripEventListWrapperTemplate(), 'beforeend');

const eventList = pageBodyElement.querySelector('.trip-events__list');
render(eventList, createTripModifyItemTemplate(tripOffer, tripDestination), 'beforeend');


for (let i = 0; i < NUMBER_OF_TRIPS; i++) {
  render(eventList, createTripEventItemTemplate(), 'beforeend');
}
