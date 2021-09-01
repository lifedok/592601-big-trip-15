
// generate mock data
import {generateTripEventListData} from './mock/trip-event-list-data.js';
import TripPresenter from './presenter/trip';
import PointsModel from './model/points';

const COUNT_ITEMS = 9;
const points = generateTripEventListData(COUNT_ITEMS);
points.sort((a, b) => a.dateFrom - b.dateFrom);

const pointsModel = new PointsModel();
console.log('pointsModel 1 ==>', pointsModel);
pointsModel.setPoints(points);
console.log('pointsModel 2 ==>', pointsModel);
console.log('points 2 ==>', points);

const pageBodyElement = document.querySelector('.page-body');
const tripEventsHeader = pageBodyElement.querySelector('.trip-main');
const tripEventsMainContainer = pageBodyElement.querySelector('.trip-events');


const tripPresenter = new TripPresenter(tripEventsHeader, tripEventsMainContainer, pointsModel);
tripPresenter.init();
