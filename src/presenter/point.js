import {remove, render, replace} from '../utils/render';
import PointItemModifyView from '../views/point-item-modify';
import PointItemView from '../views/point-item';


const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point {

  constructor(pointListWrapper, changeData, changeMode) {
    this._pointListWrapper = pointListWrapper;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointItemComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._openPointItemClick = this._openPointItemClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  init(pointItem) {
    this._pointItem = pointItem;

    const prevPointItemComponent = this._pointItemComponent;
    const prevPointEditComponent = this._pointEditComponent;
    this._pointItemComponent = new PointItemView(this._pointItem);
    this._pointEditComponent = new PointItemModifyView(this._pointItem, true);


    this._pointItemComponent.setOpenClickHandler(this._openPointItemClick);
    this._pointItemComponent.setIsFavoriteClickHandler(this._handleFavoriteClick);
    // edit item click
    this._pointEditComponent.setCloseClickHandler(() => this._closePointEditView());
    this._pointEditComponent.setCancelClickHandler(() => this._cancelPointEditView());
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (prevPointEditComponent === null || prevPointItemComponent === null) {
      render(this._pointListWrapper, this._pointItemComponent);
      return;
    }

    if (this._pointListWrapper.getElement().contains(prevPointItemComponent.getElement())) {
      replace(this._pointItemComponent, prevPointItemComponent);
    }

    if (this._pointListWrapper.getElement().contains(prevPointEditComponent.getElement())) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointItemComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointItemComponent);
    remove(this._pointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPointItem();
    }
  }

  _replacePointToEditForm() {
    replace(this._pointEditComponent, this._pointItemComponent);
    document.addEventListener('keydown', this._onEscKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPointItem() {
    replace(this._pointItemComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _backToDefaultState() {
    this._pointEditComponent.resetPoint(this._pointItem);
    this._replaceFormToPointItem();
  }

  _onEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._backToDefaultState();
    }
  }

  _cancelPointEditView() {
    this._backToDefaultState();
  }

  _closePointEditView() {
    this._backToDefaultState();
  }

  _openPointItemClick() {
    this._replacePointToEditForm();
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._pointItem,
        {
          isFavorite: !this._pointItem.isFavorite,
        },
      ),
    );
  }

  _handleFormSubmit(point) {
    this._changeData(point);
    this._replaceFormToPointItem();
  }
}
