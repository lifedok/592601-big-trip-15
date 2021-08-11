// header
import TripInfoHeaderView from './views/header/trip-info-header.js';
import TripControlsWrapperView from './views/header/trip-controls-wrapper.js';
import TripTabsHeaderView from './views/header/trip-tabs-header.js';
import TripFilterHeaderView from './views/header/trip-filters-header';
import NewEventButtonView from './views/header/btn-new-event.js';

// main
import TripEventsSort from './views/trip-events-sort.js';
import TripEventListWrapper from './views/trip-events-list-wrapper.js';
import TripModifyItem from './views/trip-event-modify-item.js';
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
// const pageMainElement = pageBodyElement.querySelector('.trip-events');
// render(pageMainElement, new TripEventsSort().getElement()); //TODO: check it, TripEventsSort doesn't show
// const listWrapper = new TripEventListWrapper();
// render(pageMainElement, listWrapper.getElement());
// // const eventList = pageBodyElement.querySelector('.trip-events__list');
//
//
// if (tripEventList.length) {
//   render(listWrapper.getElement(), new TripModifyItem(tripEventList[0], true).getElement());
//   tripEventList.map((item) =>
//     render(listWrapper.getElement(), new TripEventItemView(item).getElement()),
//   );
// } else {
//   pageBodyElement.querySelector('.trip-events__msg').textContent('Click New Event to create your first point');
// }


