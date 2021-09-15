import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import PointsModel from './model/points';
import FilterModel from './model/filter';
import {MenuItem} from './const.js';

import {remove, render, RenderPosition} from './utils/render';
import StatisticsView from './views/statistics.js';
import NewPointButtonView from './views/header/new-point-button';
import TripTabsStatisticHeaderView from './views/header/trip-tab-statistic-header';
import TripInfoWrapperHeader from './views/header/trip-wrapper-info-header';
import {SortType, UpdateType} from './const';
import Api from './api';


const END_POINT = 'https://15.ecmascript.pages.academy/big-trip/';
const AUTHORIZATION = 'Basic yjbslfexvnqfaljnb';
const api = new Api(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();
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
tripTabsStatisticHeaderView.switchOnSelectTab(SortType.TABLE); // by default sort = table

const newPointButtonView = new NewPointButtonView();
render(tripMainHeaderView, newPointButtonView);                  // create new add btn

// create trip view & create trip info + cost
const tripPresenter = new TripPresenter(tripInfoWrapperHeader, tripEventsMainContainer, pointsModel, filterModel, api);
tripPresenter.init();

let statisticsComponent = null;

let prevMenuItem = MenuItem.POINTS;
const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      if (prevMenuItem !== MenuItem.ADD_NEW_POINT) {
        tripPresenter.removeTripContent();
        tripPresenter.createPoint();
        tripTabsStatisticHeaderView.switchOnSelectTab(SortType.TABLE);
        prevMenuItem = MenuItem.ADD_NEW_POINT;
        remove(statisticsComponent);
      }
      break;
    case MenuItem.POINTS:
      if (prevMenuItem !== MenuItem.POINTS) {
        tripPresenter.createTripContent();
        prevMenuItem = MenuItem.POINTS;
        tripPresenter.setDefaultModeFilters();
        newPointButtonView.setDisabledStatus(false);
        remove(statisticsComponent);
      }
      break;
    case MenuItem.STATISTICS:
      if (prevMenuItem !== MenuItem.STATISTICS) {
        tripPresenter.removeTripContent();
        prevMenuItem = MenuItem.STATISTICS;
        filterPresenter.isDisabledFilters();
        newPointButtonView.setDisabledStatus(true);
        statisticsComponent = new StatisticsView(pointsModel.getPoints());
        render(tripEventsMainContainer, statisticsComponent);
      }
      break;
  }
};
tripTabsStatisticHeaderView.setTabSortClickHandler(handleSiteMenuClick);


document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  handleSiteMenuClick(MenuItem.ADD_NEW_POINT);
});

newPointButtonView.setDisabledStatus(true);
filterPresenter.isDisabledFilters();
api.getFetchPoints().then((pointsData) => {
  pointsModel.setPoints(UpdateType.INIT, pointsData);
  newPointButtonView.setDisabledStatus(false);
})
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
    newPointButtonView.setDisabledStatus(true);
  });


