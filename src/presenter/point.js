import {remove, render, replace} from '../utils/render';
import PointItemModifyView from '../views/point-item-modify';
import PointItemView from '../views/point-item';
import {UpdateType, UserAction} from '../const';


const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
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
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init(pointItem, offers, destinations) {
    this._pointItem = pointItem;
    this._offers = offers;
    this._destinations = destinations;

    const prevPointItemComponent = this._pointItemComponent;
    const prevPointEditComponent = this._pointEditComponent;
    this._pointItemComponent = new PointItemView(this._pointItem);
    this._pointEditComponent = new PointItemModifyView(this._pointItem, true, this._offers, this._destinations);
    this._pointCreateComponent = new PointItemModifyView(this._pointItem, false, this._offers, this._destinations);

    // just point item
    this._pointItemComponent.setOpenClickHandler(this._openPointItemClick);
    this._pointItemComponent.setIsFavoriteClickHandler(this._handleFavoriteClick);
    // edit item click
    this._pointEditComponent.setCloseClickHandler(() => this._closePointEditView());
    this._pointEditComponent.setDeleteClickHandler(() => this._deletePointItemClick());
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    // cancel item click
    this._pointCreateComponent.setCancelClickHandler(() => this._cancelPointEditView());

    // delete item click
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

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
    if (this._mode === Mode.EDITING) {
      this._replaceFormToPointItem();
    }
  }

  setViewState(state) {
    if (this._mode === Mode.DEFAULT) {
      return;
    }

    switch (state) {
      case State.SAVING:
        this._pointEditComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this._pointEditComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
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

  // for edit point item
  _deletePointItemClick() {
    remove(this._pointEditComponent);
    this._changeData(this._pointItem);
  }

  // for create point item
  _openPointItemClick() {
    this._replacePointToEditForm();
  }

  _cancelPointEditView() {
    this._backToDefaultState();
  }

  // for edit and create point item
  _closePointEditView() {
    this._backToDefaultState();
  }

  _handleFormSubmit(point) {
    const isPatchUpdate = this._pointItem.type !== point.type;
    const isMiddleUpdate = this._pointItem.destination.city !== point.destination.city;

    let type;
    if (isMiddleUpdate) {
      type = UpdateType.MIDDLE;
    } else {
      type = isPatchUpdate ? UpdateType.PATCH : UpdateType.MAJOR;
    }

    this._changeData(
      UserAction.UPDATE_POINT,
      type,
      point,
    );
    this._replaceFormToPointItem();
  }

  _handleDeleteClick(task) {
    this._changeData(
      UserAction.DELETE_POINT,
      UpdateType.MAJOR,
      task,
    );
  }

  // for just point event item
  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._pointItem,
        {
          isFavorite: !this._pointItem.isFavorite,
        },
      ),
    );
  }
}
