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

    // console.log('destinations', destinations);
    const adaptedDestinations = Object.assign(
      {},
      destinations,
      {
        city: destinations['name'],
      },
    );

    //
    // // Ненужные ключи мы удаляем
    delete destinations['name'];
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

    // Ненужные ключи мы удаляем
    delete adaptedTask.city;
    return adaptedTask;
  }
}
