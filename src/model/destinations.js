import AbstractObserver from '../utils/abstract-observer.js';

export default class Destinations extends AbstractObserver {

  constructor() {
    super();
    this._destinations = [];
  }

  setDestinations(updateType, destinations) {
    this._destinations = destinations;
    this._notify(updateType, destinations);
  }

  getDestinations() {
    return this._destinations;
  }


  static adaptToClient(destinations) {
    const adaptedDestinations = Object.assign(
      {},
      destinations,
      {
        city: destinations['name'],
      },
    );
    delete adaptedDestinations['name'];
    return adaptedDestinations;
  }

  static adaptToServer(destinations) {
    const adaptedTask = Object.assign(
      {},
      destinations,
      {
        'name': destinations.city,
      },
    );
    delete adaptedTask.city;
    return adaptedTask;
  }
}
