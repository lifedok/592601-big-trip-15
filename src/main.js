
// generate mock data
import {generateTripEventListData} from './mock/trip-event-list-data.js';

import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import PointsModel from './model/points';
import FilterModel from './model/filter';

import {render, RenderPosition} from './utils/render';
import NewPointButtonView from './views/header/new-point-button';
import TripTabsStatisticHeaderView from './views/header/trip-tab-statistic-header';
import TripInfoWrapperHeader from './views/header/trip-wrapper-info-header';

const COUNT_ITEMS = 9;
const points = generateTripEventListData(COUNT_ITEMS);
points.sort((a, b) => a.dateFrom - b.dateFrom);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const pageBodyElement = document.querySelector('.page-body');
const tripMainHeaderView = pageBodyElement.querySelector('.trip-main');
const tripStatisticsWrapperView = tripMainHeaderView.querySelector('.trip-controls__navigation');
const tripFilteringWrapperView = tripMainHeaderView.querySelector('.trip-controls__filters');
const tripEventsMainContainer = pageBodyElement.querySelector('.trip-events');


const tripTabsStatisticHeaderView = new TripTabsStatisticHeaderView();
const tripInfoWrapperHeader = new TripInfoWrapperHeader();


// create header view
render(tripMainHeaderView, tripInfoWrapperHeader, RenderPosition.AFTERBEGIN); // create wrapper for trip info & cost

const filterPresenter = new FilterPresenter(tripFilteringWrapperView, filterModel, pointsModel);
filterPresenter.init();                                           // create filters
render(tripStatisticsWrapperView, tripTabsStatisticHeaderView);   // create statistics


const newPointButtonView = new NewPointButtonView();
render(tripMainHeaderView, newPointButtonView);                  // create new add btn

// create trip view & create trip info + cost
const tripPresenter = new TripPresenter(tripInfoWrapperHeader, tripEventsMainContainer, pointsModel, filterModel);
tripPresenter.init();
