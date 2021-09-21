import AbstractObserver from '../utils/abstract-observer.js';

export default class Points extends AbstractObserver {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();

    this._notify(updateType);
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, updatePoint) {
    const index = this._points.findIndex((point) => point.id === updatePoint.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      updatePoint,
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType, updatePoint);
  }

  addPoint(updateType, updatePoint) {
    this._points = [
      updatePoint,
      ...this._points,
    ];

    this._notify(updateType, updatePoint);
  }

  deletePoint(updateType, updatePoint) {
    const index = this._points.findIndex((point) => point.id === updatePoint.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType);
  }


  static adaptToClient(point) {
    const adaptedTask = Object.assign(
      {},
      point,
      {
        basePrice: point['base_price'],
        dateFrom: point.date_from !== null ? new Date(point.date_from) : point.date_from,
        dateTo: point.date_to !== null ? new Date(point.date_to) : point.date_to,
        isFavorite: point['is_favorite'],
        destination: {
          city: point.destination['name'],
          description: point.destination['description'],
          pictures: point.destination['pictures'],
        },
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedTask['base_price'];
    delete adaptedTask['date_from'];
    delete adaptedTask['date_to'];
    delete adaptedTask['is_favorite'];
    delete adaptedTask.destination['name'];

    return adaptedTask;
  }

  static adaptToServer(point) {
    const adaptedTask = Object.assign(
      {},
      point,
      {
        'base_price': point.basePrice,
        'date_from': point.dateFrom instanceof Date ? point.dateFrom.toISOString() : null,
        'date_to': point.dateTo instanceof Date ? point.dateTo.toISOString() : null,
        'is_favorite': point.isFavorite,
        destination: {
          'name': point.destination.city,
          'description': point.destination.description,
          'pictures': point.destination.pictures,
        },
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedTask.basePrice;
    delete adaptedTask.dateFrom;
    delete adaptedTask.dateTo;
    delete adaptedTask.isFavorite;
    delete adaptedTask.destination.city;

    return adaptedTask;
  }
}
