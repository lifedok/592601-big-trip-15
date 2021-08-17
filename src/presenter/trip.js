import TripEventSortView from '../views/trip-event-sort';
import TripEventListWrapperView from '../views/trip-event-list-wrapper';
import TripEventModifyItemView from '../views/trip-event-modify-item';
import TripEventItemView from '../views/trip-event-item';
import TripEventMsgView from '../views/trip-event-msg';


export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._eventSortComponent = new TripEventSortView();
    this._eventListComponent = new TripEventListWrapperView();
    this._eventModifyComponent = new TripEventModifyItemView();
    this._eventItemComponent = new TripEventItemView();
    this._noEventComponent = new TripEventMsgView();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderTrip в main.js
  }

  _renderSort() {
    // Метод для рендеринга сортировки
  }

  _renderFilter() {
    // Метод для рендеринга фильтрации
  }

  _renderEvent() {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTripEvent в main.js
  }

  _renderEvents() {
    // Метод для рендеринга N-событий за раз
  }

  _renderNoEventTrip() {
    // Метод для рендеринга заглушки
  }

  _renderTrip() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderTrip в main.js
  }
}
