import AbstractObserver from '../utils/abstract-observer.js';

export default class Points extends AbstractObserver {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(points) {
    this._points = points.slice();
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
}
