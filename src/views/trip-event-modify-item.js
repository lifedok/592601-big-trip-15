import {OFFER_TITTLES, POINTS_TYPE} from '../const.js';
import {capitalizeFirstLetter} from '../utils.js';

export const createTripModifyItemTemplate = (tripEvent) => {
  const {offers, destination} = tripEvent;

  console.log('tripEvent', tripEvent);
  const createOffersTemplate = () => (
    offers.map((offer) =>
      `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${OFFER_TITTLES[offer.title]}-1" type="checkbox" name="event-offer-${OFFER_TITTLES[offer.title]}" checked>
            <label class="event__offer-label" for="event-offer-${OFFER_TITTLES[offer.title]}-1">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`).join('')
  );
  const offersTemplate = createOffersTemplate();


  const createPicturesSrcTemplate = () => (
    destination.pictures.map((picture) => `<img class="event__photo" src=${picture.src} alt=${picture.description}>`).join('')
  );
  const picturesSrc = createPicturesSrcTemplate();


  const createPointsTypeItemTemplate = () => (
    POINTS_TYPE.map((point) =>
      `<div class="event__type-item">
        <input id="event-type-${point}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${point}">
        <label class="event__type-label  event__type-label--${point}" for="event-type-${point}-1">${capitalizeFirstLetter(point)}</label>
      </div>`).join('')
  );


  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createPointsTypeItemTemplate()}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            Flight
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
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
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${offersTemplate}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
             ${picturesSrc}
            </div>
          </div>
        </section>
      </section>
    </form>
  </li>
  `;
};

