import {OFFER_TITTLES, POINT_TYPES, CITIES} from '../const.js';
import SmartView from './smart.js';
import {
  capitalizeFirstLetter,
  getRandomInteger
} from '../utils/common';
import {generateTripDestinationData} from '../mock/trip-destination-data';
import {generateTripOfferData} from '../mock/trip-offer-data';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createPointItemModifyTemplate = (data, isEdit) => {
  const {type, offers, destination, isDescription, isPictures} = data;

  const createOffersTemplate = () => (
    offers.map((offer) =>
      !offer ? '' :
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-1" 
                 type="checkbox" name="event-offer-${OFFER_TITTLES[offer.title]}" ${offer.isChecked}>
          <label class="event__offer-label" for="event-offer-${offer.id}-1">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price ? offer.price : getRandomInteger(20, 120)}</span>
      </label>
    </div>`).join('')
  );


  const createPicturesSrcTemplate = () => (
    destination.pictures.map((picture) => !picture.src ? '' : `<img class="event__photo" src=${picture.src} alt=${picture.description}>`).join('')
  );

  const createPointTypesTemplate = () => (
    POINT_TYPES.map((pointType) =>
      `<div class="event__type-item">
        <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}">
        <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1">${capitalizeFirstLetter(pointType)}</label>
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
          <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createPointTypesTemplate()}
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
          id="event-start-time-1" type="text" name="event-start-time" value="${data.dateFrom}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" 
          id="event-end-time-1" type="text" name="event-end-time" value="${data.dateTo}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${isEdit ? 'Delete' : 'Cancel'}</button>
        
<!--        optional button according to the state of the point (create or edit).-->
          ${isEdit === true ?
    `<button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
            ` : ''}
        
      </header>
      <section class="event__details">
      
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${createOffersTemplate()}
        </div>
       </section>
       

        ${!isDescription && !isPictures ? '' :
    `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            ${!isDescription ? '' : `<p class="event__destination-description">${destination.description}</p>`}
  
            ${!isPictures ? '' : `
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

export default class PointItemModify extends SmartView {

  constructor(pointEvent, isEdit) {
    super();
    this._data = PointItemModify.parsePointToDataState(pointEvent);
    this._isEdit = isEdit;
    this._datepicker = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._cancelClickHandler = this._cancelClickHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._choosePointTypeClickHandler = this._choosePointTypeClickHandler.bind(this);
    this._selectingDestinationInputHandler = this._selectingDestinationInputHandler.bind(this);

    // this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    // this._dateToChangeHandler = this._dateToChangeHandler.bind(this);
    this._dateChangeHandler = this._dateChangeHandler.bind(this);

    this._setOuterHandlers();
    this._setInnerHandlers();
    this._setDatepicker();
  }


  resetPoint(point) {
    this.updateData(
      PointItemModify.parsePointToDataState(point),
    );
  }

  getTemplate() {
    return createPointItemModifyTemplate(this._data, this._isEdit);
  }

  restoreHandlers() {
    this._setOuterHandlers();
    this._setInnerHandlers();
    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  _setOuterHandlers() {
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._isEdit ? this._deleteClickHandler : this._cancelClickHandler);
    this._isEdit && this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._closeClickHandler);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('click', this._choosePointTypeClickHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('input', this._selectingDestinationInputHandler);
  }

  // form submit
  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(PointItemModify.parseDataStateToPoint(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  // cancel point click
  _cancelClickHandler(evt) {
    evt.preventDefault();
    this._callback.cancelClick();
  }

  setCancelClickHandler(callback) {
    this._callback.cancelClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._cancelClickHandler);
  }

  // delete point click
  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick();
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._deleteClickHandler);
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
    if(!this._isEdit) {
      return;
    }
    this._callback.closeClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._closeClickHandler);
  }

  //change Point Type
  _choosePointTypeClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== 'LABEL') {
      return;
    }
    const parent = evt.target.parentElement;
    parent.querySelector('input').checked = true;

    this.updateData({
      type: evt.target.innerText,
      offers: generateTripOfferData().offers,
    });
  }

  //change input Destination
  _selectingDestinationInputHandler(evt) {
    evt.preventDefault();
    CITIES.map((city) => {
      if(evt.target.value === city) {
        this.updateData({
          destination: {
            city: evt.target.value,
            pictures: generateTripDestinationData().pictures,
            description: generateTripDestinationData(evt.target.value).description,
          },
        });
      }
    });
  }

  // date from and to
  _dateChangeHandler([userData]) {
    console.log('TEST --> userData', userData);

    this.updateData({
      dateFrom: userData,
      // dateTo: userData,
    });
  }

  _setDatepicker() {
    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }

    this._datepicker = flatpickr(
      this.getElement().querySelector('.event__field-group--time'),
      {
        mode: 'range',
        dateFormat: 'j/m/y \\ H:i',
        defaultDate: [this._data.dateFrom.format('DD/MM/YY HH:mm'), this._data.dateTo.format('DD/MM/YY HH:mm')],
        onChange: this._dateChangeHandler,
      },
    );
  }


  static parsePointToDataState(point) {
    return Object.assign(
      {},
      point,
      {
        isDescription: !!point.destination.description,
        isPictures: !!point.destination.pictures.length,
      },
    );
  }

  static parseDataStateToPoint(state) {
    state = Object.assign({}, state);
    if (!state.isDescription) {
      state.isDescription = null;
    }
    if (!state.isPictures) {
      state.isPictures = null;
    }

    delete state.isDescription;
    delete state.isPictures;

    return state;
  }
}
