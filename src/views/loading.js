import AbstractView from './abstract.js';

const createNoTaskTemplate = () => (
  `<p class="trip-events">
    Loading...
  </p>`
);

export default class Loading extends AbstractView {
  getTemplate() {
    return createNoTaskTemplate();
  }
}
