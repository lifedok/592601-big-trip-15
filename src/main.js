
// generate mock data
import {generateTripEventListData} from './mock/trip-event-list-data.js';
import TripPresenter from './presenter/trip';


const COUNT_ITEMS = 9;
const tripEventList = generateTripEventListData(COUNT_ITEMS);
tripEventList.sort((a, b) => a.dateFrom - b.dateFrom);


const pageBodyElement = document.querySelector('.page-body');
const tripEventsHeader = pageBodyElement.querySelector('.trip-main');
const tripEventsMainContainer = pageBodyElement.querySelector('.trip-events');


const tripPresenter = new TripPresenter(tripEventsHeader, tripEventsMainContainer);
tripPresenter.init(tripEventList);
