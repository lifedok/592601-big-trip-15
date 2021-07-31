// header
import {createNewEventButtonTemplate} from './templates/header/create-btn-new-event.js';
import {createTripControlsWrapperTemplate} from './templates/create-trip-controls-wrapper.js';

import {createTripTabsHeader} from './templates/header/create-trip-tabs-header.js';

import {createTripFilterHeaderTemplate} from './templates/header/create-trip-filters-header.js';
import {createTripInfoHeaderTemplate} from './templates/header/create-trip-info-header.js';

// body-main
import {createTripEventsSortTemplate} from './templates/create-trip-events-sort.js';

// list wrapper
import {createTripEventListWrapperTemplate} from './templates/create-trip-events-list-wrapper.js';

// create edit/add new item
import {createTripEventItemEditWrapper} from './templates/event-item/create-trip-event-item-edit/create-trip-event-item-edit-wrapper.js';
import {createTripEventItemEditHeader} from './templates/event-item/create-trip-event-item-edit/create-trip-event-item-edit-header.js';
import {createEventItemCollapsibleBtn} from './templates/event-item/create-trip-event-item-edit/create-event-item-collapsible-btn.js';
// event details
import {createTripEventDetailsWrapper} from './templates/event-item/create-trip-event-item-edit/create-trip-event-details-wrapper.js';
import {createTripEventItemEditOffers} from './templates/event-item/create-trip-event-item-edit/create-trip-event-item-edit-offers.js';
import {createTripEventDestinationWrapper} from './templates/event-item/create-trip-event-item-edit/create-trip-event-destination-wrapper.js';
import {createTripEventDestinationDescription} from './templates/event-item/create-trip-event-item-edit/create-trip-event-destination-description.js';
import {createTripEventDestinationPhotos} from './templates/event-item/create-trip-event-item-edit/create-trip-event-destination-photos.js';


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
const eventList = pageBodyElement.querySelector('.trip-events__list');

//create new event item
render(eventList, createTripEventItemEditWrapper(), 'beforeend');
const newEvent = eventList.querySelector('.event--edit');
render(newEvent, createTripEventItemEditHeader(), 'beforeend');
render(newEvent, createTripEventDetailsWrapper(), 'beforeend');
const newEventDetails = eventList.querySelector('.event__details');
render(newEventDetails, createTripEventItemEditOffers(), 'beforeend');
render(newEventDetails, createTripEventDestinationWrapper(), 'beforeend');
const eventDestination = eventList.querySelector('.event__section--destination');
render(eventDestination, createTripEventDestinationDescription(), 'beforeend');
render(eventDestination, createTripEventDestinationPhotos(), 'beforeend');


// add just event item
render(eventList, createTripEventItemTemplate(), 'beforeend');
render(eventList, createTripEventItemTemplate(), 'beforeend');

//create edit event item
render(eventList, createTripEventItemEditWrapper(), 'beforeend');
const editItem = eventList.querySelectorAll('.event--edit')[1];
render(editItem, createTripEventItemEditHeader(), 'beforeend');
const editItemHeader = editItem.querySelector('.event__header');
// console.log('editItem', editItemHeader);
render(editItemHeader, createEventItemCollapsibleBtn(), 'beforeend');

render(editItem, createTripEventDetailsWrapper(), 'beforeend');
const eventDetails = editItem.querySelector('.event__details');
render(eventDetails, createTripEventItemEditOffers(), 'beforeend');
render(eventDetails, createTripEventDestinationWrapper(), 'beforeend');
const editEventDestination = editItem.querySelector('.event__section--destination');
render(editEventDestination, createTripEventDestinationDescription(), 'beforeend');


//add events list
render(eventList, createTripEventsListTemplate(), 'beforeend');


