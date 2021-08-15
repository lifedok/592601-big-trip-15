import Abstract from '../abstract';


const createNewEventButtonTemplate = () => (
  `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
`
);


export default class NewEventButton extends Abstract {

  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createNewEventButtonTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }
}
