import {render, replace} from '../utils/render';
import PointItemModifyView from '../views/point-item-modify';
import PointItemView from '../views/point-item';

export default class Point {

  constructor(pointListWrapper) {
    this._pointListWrapper = pointListWrapper;

    this._pointEditComponent = null;
    this._pointItemView = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._openPointItemClick = this._openPointItemClick.bind(this);
  }

  init(pointItem) {
    this._pointItem = pointItem;
    this._pointEditComponent = new PointItemModifyView(this._pointItem, true);
    this._pointItemView = new PointItemView(this._pointItem);


    this._pointItemView.setOpenClickHandler(this._openPointItemClick);
    // edit item click
    this._pointEditComponent.setCloseClickHandler(() => this._closePointEditView());
    this._pointEditComponent.setResetClickHandler(() => this._closePointEditView());
    this._pointEditComponent.setFormSubmitHandler(() => this._closePointEditView());
    this._pointEditComponent.setSaveClickHandler(() => this._closePointEditView());

    render(this._pointListWrapper, this._pointItemView);
  }

  _replacePointToEditForm() {
    replace(this._pointEditComponent, this._pointItemView);
    document.addEventListener('keydown', this._onEscKeyDown);
  }

  _replaceFormToPointItem() {
    replace(this._pointItemView, this._pointEditComponent);
    document.removeEventListener('keydown', this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToPointItem();
    }
  }

  _closePointEditView() {
    this._replaceFormToPointItem();
    document.removeEventListener('keydown', this._onEscKeyDown);
  }

  _openPointItemClick() {
    this._replacePointToEditForm();
  }

  // _setIsFavoriteClickHandler() {
  //   this._pointItem.isFavorite = !this._pointItem.isFavorite;
  //   return new PointItemView(...this._pointItem);
  // }
}
