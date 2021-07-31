// header
import {createNewEventButtonTemplate} from './templates/header/create-btn-new-event.js';
import {createTripControlsWrapperTemplate} from './templates/wrappers/create-trip-controls-wrapper.js';

import {createTripTabsHeader} from './templates/header/create-trip-tabs-header.js';

import {createTripFilterHeaderTemplate} from './templates/header/create-trip-filters-header.js';
import {createTripInfoHeaderTemplate} from './templates/header/create-trip-info-header.js';

// body-main
import {createTripEventsSortTemplate} from './templates/create-trip-events-sort.js';

// list wrapper
import {createTripEventListWrapperTemplate} from './templates/wrappers/create-trip-events-list-wrapper.js';

// create edit item
import {createTripEventItemEditWrapper} from './templates/event-item/create-trip-event-item-edit/create-trip-event-item-edit-wrapper.js';
import {createTripEventItemEditHeader} from './templates/event-item/create-trip-event-item-edit/create-trip-event-item-edit-header.js';
import {createTripEventDetailsWrapper} from './templates/event-item/create-trip-event-item-edit/create-trip-event-details-wrapper.js';
import {createTripEventItemEditOffers} from './templates/event-item/create-trip-event-item-edit/create-trip-event-item-edit-offers.js';
import {createTripEventItemEditDestination} from './templates/event-item/create-trip-event-item-edit/create-trip-event-item-edit-destination.js';

// content for list
import {createTripEventItemTemplate} from './templates/event-item/create-trip-event-item.js';
import {createTripEventsListTemplate} from './templates/create-trip-events-list.js';


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

//create edit item
render(eventList, createTripEventItemEditWrapper(), 'beforeend');
const editItem = eventList.querySelector('.event--edit');
render(editItem, createTripEventItemEditHeader(), 'beforeend');
render(editItem, createTripEventDetailsWrapper(), 'beforeend');
const eventDetails = eventList.querySelector('.event__details');
render(eventDetails, createTripEventItemEditOffers(), 'beforeend');
render(eventDetails, createTripEventItemEditDestination(), 'beforeend');

//add events list
render(eventList, createTripEventsListTemplate(), 'beforeend');


