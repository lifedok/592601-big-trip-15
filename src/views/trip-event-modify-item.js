import {OFFER_TITTLES, POINTS_TYPE, CITIES} from '../const.js';
import Abstract from './abstract';
import {capitalizeFirstLetter, generateRandomBoolean, getRandomInteger} from '../utils/common';


const createTripEventModifyItemTemplate = (tripEvent, isEdit) => {
  const {type, offers, destination} = tripEvent;

  const createOffersTemplate = () => (
    isEdit === true ?
      offers.map((offer) => {
        const isChecked = generateRandomBoolean(0.3) ? 'checked' : '';
        return (
          !offer ? '' :
            `<div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-${OFFER_TITTLES[offer.title]}-1" 
                type="checkbox" name="event-offer-${OFFER_TITTLES[offer.title]}" ${isChecked}>
                <label class="event__offer-label" for="event-offer-${OFFER_TITTLES[offer.title]}-1">
                  <span class="event__offer-title">${offer.title}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${offer.price}</span>
              </label>
            </div>`);
      },
      ).join('')
      :
      Object.keys(OFFER_TITTLES).map((offer) =>
        `<div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-${OFFER_TITTLES[offer]}-1" 
                type="checkbox" name="event-offer-${OFFER_TITTLES[offer]}">
                <label class="event__offer-label" for="event-offer-${OFFER_TITTLES[offer]}-1">
                  <span class="event__offer-title">${offer}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${getRandomInteger(20, 120)}</span>
              </label>
            </div>`).join('')
  );


  const createPicturesSrcTemplate = () => (
    destination.pictures.map((picture) => !picture.src ? '' : `<img class="event__photo" src=${picture.src} alt=${picture.description}>`).join('')
  );

  const createPointsSelectTemplate = () => (
    POINTS_TYPE.map((point) =>
      `<div class="event__type-item">
        <input id="event-type-${point}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${point}">
        <label class="event__type-label  event__type-label--${point}" for="event-type-${point}-1">${capitalizeFirstLetter(point)}</label>
      </div>`).join('')
  );

  const createDestinationListTemplate = () => (
    CITIES.map((city) => `<option value="${city}"></option>`).join('')
  );

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createPointsSelectTemplate()}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" 
                 type="text" name="event-destination" value="${destination.city}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${createDestinationListTemplate()}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" 
          id="event-start-time-1" type="text" name="event-start-time" value="${tripEvent.dateFrom.format('DD/MM/YY HH:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" 
          id="event-end-time-1" type="text" name="event-end-time" value="${tripEvent.dateTo.format('DD/MM/YY HH:mm')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
        
<!--        optional button according to the state of the event.-->
          ${isEdit === true ?
    `<button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
            ` : ''}
        
      </header>
      <section class="event__details">
      
        ${!offers.length && isEdit === true ? '' :
    `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${createOffersTemplate()}
          </div>
        </section>
        `}


        ${!destination.description && !destination.pictures.length ? '' :
    `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            ${!destination.description ? '' : `<p class="event__destination-description">${destination.description}</p>`}
  
            ${!destination.pictures.length ? '' : `
              <div class="event__photos-container">
                <div class="event__photos-tape">
                 ${createPicturesSrcTemplate()}
                </div>
              </div>
              `}
          </section>
        `}
        
      </section>
    </form>
  </li>
  `;
};

export default class TripEventModifyItem extends Abstract {

  constructor(tripEvent, isEdit) {
    super();
    this._tripEvent = tripEvent;
    this._isEdit = isEdit;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._saveClickHandler = this._saveClickHandler.bind(this);
    this._resetClickHandler = this._resetClickHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
  }

  getTemplate() {
    return createTripEventModifyItemTemplate(this._tripEvent, this._isEdit);
  }

  // form submit
  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  // save click
  _saveClickHandler(evt) {
    evt.preventDefault();
    this._callback.saveClick();
  }

  setSaveClickHandler(callback) {
    this._callback.saveClick = callback;
    this.getElement().querySelector('.event__save-btn').addEventListener('click', this._saveClickHandler);
  }

  // reset click
  _resetClickHandler(evt) {
    evt.preventDefault();
    this._callback.resetClick();
  }

  setResetClickHandler(callback) {
    this._callback.resetClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._resetClickHandler);
  }

  // close click
  _closeClickHandler(evt) {
    if(this._isEdit) {
      evt.preventDefault();
      this._callback.closeClick();
    } else {
      throw new Error('The open closeClickHandler event is only found in the TripEventModifyItem with the isEdit = true flag');
    }
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._closeClickHandler);
  }
}
