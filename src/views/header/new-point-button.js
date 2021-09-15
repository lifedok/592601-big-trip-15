import Abstract from '../abstract';


const createNewPointButtonTemplate = () => (
  `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
`
);


export default class NewPointButton extends Abstract {

  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createNewPointButtonTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }

  setDisabledStatus(value) {
    return this.getElement().disabled = value;
  }
}
