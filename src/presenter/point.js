import {render} from "../utils/render.js";
import EditPointView from "../view/editing-points.js";
import PointView from "../view/point.js";

const KEY_VALUE = {
  ESCAPE: `Escape`,
  ESC: `Esc`
};

export default class Point {
  constructor(pointsContainer) {
    this._pointsContainer = pointsContainer;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onCancelClick = this._onCancelClick.bind(this);
  }

  init(point) {
    this._pointComponent = new PointView(point);
    this._editComponent = new EditPointView(point);

    this._pointComponent.setEditClickHandler(this._replacePointToForm());
    this._pointComponent.setFavoritesClickHandler(this._pointComponent.toggleFavorite());

    this._editComponent.setFormSubmitHandler(() => {
      this._replaceFormToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._editComponent.setCancelClickEdit(() => {
      this._replaceFormToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    render(this._pointsContainer, this._pointComponent);
  }

  _onEscKeyDown(evt) {
    if (evt.key === KEY_VALUE.ESCAPE || evt.key === KEY_VALUE.ESC) {
      evt.preventDefault();
      this._formComponent = this._editComponent.getElement().querySelector(`form`);
      this._formButtonCancel = this._formComponent.querySelector(`.event__reset-btn`);
      this._replaceFormToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      this._formButtonCancel.removeEventListener(`click`, this._onCancelClick);
    }
  }

  _onCancelClick(evt) {
    evt.preventDefault();
    this._replaceFormToPoint();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replacePointToForm() {
    // this._pointsContainer.replaceChild(this._editComponent.getElement(), this._pointComponent.getElement());
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceFormToPoint() {
    this._pointsContainer.replaceChild(this._pointComponent.getElement(), this._editComponent.getElement());
  }
}
