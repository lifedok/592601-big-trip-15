
// generate mock data
import {generateTripEventListData} from './mock/trip-event-list-data.js';

import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import PointsModel from './model/points';
import FilterModel from './model/filter';
import {MenuItem} from './const.js';

import {render, RenderPosition} from './utils/render';
import NewPointButtonView from './views/header/new-point-button';
import PointSortView from './views/point-sort';
import TripTabsStatisticHeaderView from './views/header/trip-tab-statistic-header';
import TripInfoWrapperHeader from './views/header/trip-wrapper-info-header';
import {sortPointsByDay} from './utils/point';
import {SortType} from './const';

const COUNT_ITEMS = 9;
const points = generateTripEventListData(COUNT_ITEMS);
const sortPoint = points.sort(sortPointsByDay);

const pointsModel = new PointsModel();
pointsModel.setPoints(sortPoint);

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
const tripPresenter = new TripPresenter(tripInfoWrapperHeader, tripEventsMainContainer, pointsModel, filterModel);
tripPresenter.init();


const handleSiteMenuClick = (menuItem) => {
  console.log('test ==> menuItem', menuItem);

  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      // Скрыть статистику

      tripPresenter.removeTripContent(); // Скрыть доску
      // tripPresenter.destroy(); // Показать доску
      // filterModel.setFilter(UpdateType.MAJOR, FILTER_TYPES.EVERYTHING);
      // tripPresenter.init();

      tripPresenter.createPoint(); // Показать форму добавления новой задачи
      tripTabsStatisticHeaderView.switchOnSelectTab(SortType.TABLE); // Убрать выделение с ADD NEW TASK после сохранения
      break;
    case MenuItem.POINTS:
      tripPresenter.createTripContent(); // Показать доску
      // Скрыть статистику
      break;
    case MenuItem.STATISTICS:
      // new PointSortView().removeElement();
      tripPresenter.removeTripContent(); // Скрыть доску

      // Показать статистику
      break;
  }
};
tripTabsStatisticHeaderView.setTabSortClickHandler(handleSiteMenuClick);


document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  handleSiteMenuClick(MenuItem.ADD_NEW_POINT);
});
