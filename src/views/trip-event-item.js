import {createElement} from '../utils.js';

const createTripEventItemTemplate = (item) => {
  const {type, destination, offers, isFavorite} = item;

  const createOffersTemplate = () => (
    offers.length ?
      offers.map((offer) =>
        `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </li>
      `).join('') : ''
  );


  const getDuration = () => {
    const hours = ((item.dateTo.diff(item.dateFrom, 'hour')) % 24).toString().replace(/^0+/, '');
    const minutes = (item.dateTo.diff(item.dateFrom, 'm')) % 60;
    return `${hours ? `${hours}H ` : ''}${minutes}M`;
  };

  return `
   <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${item.dateFrom.format('MMM D')}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </div>

        <h3 class="event__title">${type} ${destination.city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${item.dateFrom.format('HH:mm').toString().replace(/^0+/, '')}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${item.dateTo.format('HH:mm')}</time>
          </p>
          <p class="event__duration">${getDuration()}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${item.basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        
         ${!offers.length ? '' :
    `<ul class="event__selected-offers">
          ${createOffersTemplate()}
        </ul>`}
        
    
        <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
};


export default class TripEventItem {

  constructor(item) {
    this._item = item;
    this._element = null;
  }

  getTemplate() {
    return createTripEventItemTemplate(this._item);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

