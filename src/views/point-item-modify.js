import he from 'he';
import SmartView from './smart.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import {getDate, getFormatDate} from '../utils/point';
import {ITEM_BLANK} from '../const';


const createPointItemModifyTemplate = (dataPoint, isEdit, offerList, destinationList) => {
  if (!dataPoint || !offerList || !destinationList) {
    return;
  }

  const {type, offers, destination, isDescription, isPictures} = dataPoint;


  function isChecked(offer) {
    return offers.some((offerEl) =>
      offerEl.type === offer.type && offerEl.title === offer.title && offerEl.price === offer.price);
  }

  const createOffersTemplate = () => {
    if (!offerList.length) {
      return;
    }

    return offerList.map((offerItem) => {
      if (offerItem.type === type) {
        return offerItem.offers.map((offer) => (
          `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="${offer.title + offer.price}" 
                   type="checkbox" name="${offer.title}" ${isChecked(offer) ? 'checked' : null}>
            <label class="event__offer-label" for="${offer.title + offer.price}">
               <span class="event__offer-title">${offer.title}</span>
                &plus;&euro;&nbsp;
               <span class="event__offer-price">${offer.price}</span>
            </label>
        </div>`)).join('');
      }
    }).join('');
  };


  const createPicturesSrcTemplate = () => (
    destination.pictures.map((picture) =>
      !picture.src ? '' : `<img class="event__photo" src=${picture.src} alt=${picture.description}>`).join('')
  );

  const createPointTypesTemplate = () =>
    offerList.map((offerItem) =>
      (`<div class="event__type-item">
            <input id="event-type-${offerItem.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offerItem.type}">
            <label class="event__type-label  event__type-label--${offerItem.type}" for="event-type-${offerItem.type}-1">${offerItem.type}</label>
        </div>`)).join('');

  const createDestinationListTemplate = () =>
    destinationList.map((destinationItem) => `<option value="${destinationItem.city}"></option>`).join('');

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
                 type="text" name="event-destination" value="${he.encode(destination.city)}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${createDestinationListTemplate()}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" 
          id="event-start-time-1" type="text" name="event-start-time" value="${getFormatDate(dataPoint.dateFrom, 'DD/MM/YY HH:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" 
          id="event-end-time-1" type="text" name="event-end-time" value="${getFormatDate(dataPoint.dateTo, 'DD/MM/YY HH:mm')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${!dataPoint ? '' : dataPoint.basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${isEdit ? 'Delete' : 'Cancel'}</button>
        
<!--        optional button according to the state of the point (create or edit).-->
          ${isEdit === true ?
    `<button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>` : ''}
        
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
              </div>`}
          </section>`}
        
      </section>
    </form>
  </li>
  `;
};

export default class PointItemModify extends SmartView {

  constructor(pointEvent = ITEM_BLANK, isEdit, offers, destinations) {
    super();
    this._isEdit = isEdit;
    this._offerList = offers;
    this._destinations = destinations;

    this._data = PointItemModify.parsePointToDataState(pointEvent);
    this._datepickerFrom = null;
    this._datepickerTo = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._cancelClickHandler = this._cancelClickHandler.bind(this);
    this._resetClickHandler = this._resetClickHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._choosePointTypeClickHandler = this._choosePointTypeClickHandler.bind(this);
    this._setPriceInputHandler = this._setPriceInputHandler.bind(this);
    this._setOffersHandler = this._setOffersHandler.bind(this);
    this._selectingDestinationInputHandler = this._selectingDestinationInputHandler.bind(this);

    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateToChangeHandler = this._dateToChangeHandler.bind(this);

    this._setOuterHandlers();
    this._setInnerHandlers();
    this._setDatepicker();
  }


  resetPoint(point) {
    this.updateData(
      PointItemModify.parsePointToDataState(point),
    );
  }

  removeElement() {
    super.removeElement();

    if (this._datepickerFrom) {
      this._datepickerFrom.destroy();
      this._datepickerFrom = null;
    }
    if (this._datepickerTo) {
      this._datepickerTo.destroy();
      this._datepickerTo = null;
    }
  }

  getTemplate() {
    return createPointItemModifyTemplate(this._data, this._isEdit, this._offerList, this._destinations);
  }

  restoreHandlers() {
    this._setOuterHandlers();
    this._setInnerHandlers();
    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setOuterHandlers() {
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._resetClickHandler);
    this._isEdit && this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._closeClickHandler);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('click', this._choosePointTypeClickHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('input', this._selectingDestinationInputHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('input', this._setPriceInputHandler);
    this.getElement().querySelector('.event__available-offers').addEventListener('input', this._setOffersHandler);
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

  _resetClickHandler() {
    return this._isEdit ? this._formDeleteClickHandler : this._cancelClickHandler;
  }

  // cancel point click
  _cancelClickHandler(evt) {
    evt.preventDefault();
  }

  setCancelClickHandler(callback) {
    this._callback.cancelClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._cancelClickHandler);
  }

  // delete point click
  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(PointItemModify.parsePointToDataState(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  // close click
  _closeClickHandler(evt) {
    if (this._isEdit) {
      evt.preventDefault();
      this._callback.closeClick();
    } else {
      throw new Error('The open closeClickHandler event is only found in the TripEventModifyItem with the isEdit = true flag');
    }
  }

  setCloseClickHandler(callback) {
    if (!this._isEdit) {
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

    this._offerList.map((offer) => {
      if (evt.target.innerText === offer.type) {
        this.updateData({
          type: evt.target.innerText,
          // offers: offer.offers,
        });
      }
    });
  }

  //change input price
  _setPriceInputHandler(evt) {
    evt.preventDefault();
    let info = '';
    const value = Number(evt.target.value);
    if (value < 0) {
      info = 'Данное поле работает только с положительным числом';
    }

    evt.target.setCustomValidity(info);
    evt.target.reportValidity();
    if (!evt.target.validity.valid) {
      return;
    }

    this.updateData({
      basePrice: Number(evt.target.value),
    });
    this.getElement().querySelector('.event__input--price').focus();
  }

  _setOffersHandler(evt) {
    evt.target.toggleAttribute('checked');
    const offerElements = Array.from(this.getElement().querySelectorAll('.event__offer-checkbox:checked'));
    const selectedOffers = Array.from(offerElements.map((elem) => elem = {
      'title': elem.dataset.offerTitle,
      'price': Number(elem.dataset.offerPrice),
    }));
    this.updateData({
      offers: selectedOffers,
    }, true);
  }

  //change input Destination
  _selectingDestinationInputHandler(evt) {
    evt.preventDefault();
    this._destinations.map((destination) => {
      if (evt.target.value === destination.city) {
        this.updateData({
          destination: {
            city: evt.target.value,
            pictures: destination.pictures,
            description: destination.description,
          },
        });
      }
    });
  }

  // date from and to
  _dateFromChangeHandler([userDate]) {
    const fromDate = getDate(userDate).diff(getDate(this._data.dateTo, 'm')); // -1
    const newFromDate = fromDate < 0 ? userDate : this._data.dateTo;
    this.updateData({
      dateFrom: newFromDate,
    });
  }

  _dateToChangeHandler([userDate]) {
    const toDate = getDate(userDate).diff(getDate(this._data.dateFrom, 'm')); // +1
    const newToDate = toDate > 0 ? userDate : this._data.dateFrom;
    this.updateData({
      dateTo: newToDate,
    });
  }

  _setDatepicker() {
    if (this._datepickerFrom) {
      this._datepickerFrom.destroy();
      this._datepickerFrom = null;
    }
    if (this._datepickerTo) {
      this._datepickerTo.destroy();
      this._datepickerTo = null;
    }

    this._datepickerFrom = flatpickr(
      this.getElement().querySelector('[name = "event-start-time"]'),
      {
        dateFormat: 'j/m/y \\ H:i',
        enableTime: true,
        'time_24hr': true,
        weekNumbers: true,
        defaultDate: this._data.dateFrom,
        onChange: this._dateFromChangeHandler,
      },
    );
    this._datepickerTo = flatpickr(
      this.getElement().querySelector('[name = "event-end-time"]'),
      {
        dateFormat: 'j/m/y \\ H:i',
        enableTime: true,
        'time_24hr': true,
        weekNumbers: true,
        defaultDate: this._data.dateTo,
        onChange: this._dateToChangeHandler,
      },
    );
  }


  static parsePointToDataState(point) {
    if (!point || !point.destination) {
      return;
    }
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
