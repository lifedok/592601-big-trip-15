
// generate mock data
import {generateTripEventListData} from './mock/trip-event-list-data.js';

import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import PointsModel from './model/points';
import FilterModel from './model/filter';
import TripControlsWrapperView from './views/header/trip-controls-wrapper';
import {render} from './utils/render';
import NewPointButtonView from './views/header/new-point-button';
import TripTabsHeaderView from './views/header/trip-tabs-header';

const COUNT_ITEMS = 9;
const points = generateTripEventListData(COUNT_ITEMS);
points.sort((a, b) => a.dateFrom - b.dateFrom);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const pageBodyElement = document.querySelector('.page-body');
const tripHeaderMainView = pageBodyElement.querySelector('.trip-main');
const tripEventsMainContainer = pageBodyElement.querySelector('.trip-events');


const tripPresenter = new TripPresenter(tripHeaderMainView, tripEventsMainContainer, pointsModel, filterModel);
tripPresenter.init();

const controlsWrapperView = new TripControlsWrapperView();
render(tripHeaderMainView, controlsWrapperView);
const tripTabsHeaderView = new TripTabsHeaderView();
render(controlsWrapperView, tripTabsHeaderView); //TODO: remove it and connect filter через init

const filterPresenter = new FilterPresenter(controlsWrapperView, filterModel, pointsModel);
filterPresenter.init();

const newPointButtonView = new NewPointButtonView();
render(tripHeaderMainView, newPointButtonView);

