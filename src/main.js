import {newEventButtonTemplate} from './views/btn-new-event.js';
import {tripFilterHeaderTemplate} from './views/trip-filters-header.js';
import {tripInfoHeaderTemplate} from './views/trip-info-header.js';

import {tripEventsSortTemplate} from './views/trip-events-sort.js';
import {tripEventListTemplate} from './views/trip-event-list.js';
import {editEventFormTemplate} from './views/edit-event-form.js';


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const pageBodyElement = document.querySelector('.page-body');

// header
const tripMainHeader = pageBodyElement.querySelector('.trip-main');
render(tripMainHeader, tripInfoHeaderTemplate(), 'beforeend');
render(tripMainHeader, tripFilterHeaderTemplate(), 'beforeend');
render(tripMainHeader, newEventButtonTemplate(), 'beforeend');

//body-main
const pageMainElement = pageBodyElement.querySelector('.trip-events');
render(pageMainElement, tripEventsSortTemplate(), 'beforeend');
render(pageMainElement, editEventFormTemplate(), 'beforeend');
render(pageMainElement, tripEventListTemplate(), 'beforeend');

