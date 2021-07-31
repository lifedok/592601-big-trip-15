// header
import {createNewEventButtonTemplate} from './views/create-btn-new-event.js';
import {createTripControlsWrapperTemplate} from './views/create-trip-controls-wrapper.js';

import {createTripTabsHeader} from './views/create-trip-tabs-header.js';

import {createTripFilterHeaderTemplate} from './views/create-trip-filters-header.js';
import {createTripInfoHeaderTemplate} from './views/create-trip-info-header.js';

// body-main
import {createTripEventsSortTemplate} from './views/create-trip-events-sort.js';

// list wrapper
import {createTripEventListWrapperTemplate} from './views/create-trip-events-list-wrapper.js';

// content for list
import {createTripEventItemTemplate} from './views/create-trip-event-item.js';
import {createEditEventFormTemplate} from './views/create-edit-event-form.js';
import {createTripEventsListTemplate} from './views/create-trip-events-list.js';


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const pageBodyElement = document.querySelector('.page-body');

// header
const tripMainHeader = pageBodyElement.querySelector('.trip-main');
render(tripMainHeader, createTripInfoHeaderTemplate(), 'beforeend');
render(tripMainHeader, createTripControlsWrapperTemplate(), 'beforeend');
render(tripMainHeader, createNewEventButtonTemplate(), 'beforeend');

const tripControlsHeader = tripMainHeader.querySelector('.trip-controls');
render(tripControlsHeader, createTripTabsHeader(), 'beforeend');
render(tripControlsHeader, createTripFilterHeaderTemplate(), 'beforeend');


// add list wrapper
const pageMainElement = pageBodyElement.querySelector('.trip-events');
render(pageMainElement, createTripEventsSortTemplate(), 'beforeend');
render(pageMainElement, createTripEventListWrapperTemplate(), 'beforeend');

// content for list
const eventList = pageBodyElement.querySelector('.trip-events__list');
render(eventList, createTripEventItemTemplate(), 'beforeend');
render(eventList, createEditEventFormTemplate(), 'beforeend');
render(eventList, createTripEventsListTemplate(), 'beforeend');


