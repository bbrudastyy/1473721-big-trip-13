import {SortType, UpdateType, UserAction} from "../mock/task.js";
import {sortByDay, sortByPrice, sortByTime, FilterType} from "../utils/task.js";
// import {updateItem} from "../utils/common.js";
import {render} from "../utils/render.js";
// import TripFilterView from "../view/trip-filter.js";
import TripSortView from "../view/trip-sort.js";
import NoPointView from "../view/no-point.js";
import PointPresenter from "./point.js";
import {filter} from "../utils/filter.js";
import PointNewPresenter from "./point-new.js";

export default class Route {
  constructor(container, pointsModel, offersModel, destinationsModel, filtersModel) {
    this._siteListElement = container;
    this._pointsModel = pointsModel;
    this._offersModel = offersModel;
    this._filtersModel = filtersModel;
    this._destinationsModel = destinationsModel;
    this._currentSortType = SortType.DAY;
    this._pointsPresenter = [];

    this._sortComponent = new TripSortView();

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);

    // this.hide = this.hide.bind(this);
    // this.show = this.show.bind(this);

    this._pointNewPresenter = new PointNewPresenter(this._sortComponent, this._handleViewAction, this._offersModel, this._destinationsModel);
  }

  init() {
    this._renderSort();
    this._renderPointsList();
  }

  hide() {
    console.log(this._siteListElement);
    this._siteListElement.hide();
  }

  show() {
    this._siteListElement.show();
  }

  createPoint() {
    this._currentSortType = SortType.DAY;
    this._filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init(this._pointsModel);
  }

  _getPoints() {
    const filterType = this._filtersModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.DAY:
        return filtredPoints.sort(sortByDay);
      case SortType.TIME:
        return filtredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filtredPoints.sort(sortByPrice);
      default:
        return filtredPoints.sort(sortByDay);
    }
  }

  _renderSort() {
    render(this._siteListElement, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPointsList() {
    const pointsCount = this._getPoints().length;
    if (pointsCount === 0) {
      render(this._siteListElement, new NoPointView());
    }
    this._renderPoints(this._getPoints());
  }

  _renderPoints(points) {
    points.forEach((point) => {
      const pointPresenter = new PointPresenter(this._siteListElement, this._handleModeChange, this._handleViewAction, this._offersModel, this._destinationsModel);
      pointPresenter.init(point);
      this._pointsPresenter.push(pointPresenter);
    });
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearPointsList();
    this._renderPointsList();
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    Object.values(this._pointsPresenter).forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(point) {
    this._pointsPresenter.find((element) => element.getId() === point.id).init(point);
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, point) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._handlePointChange(point);
        this._pointsPresenter.find((element) => element.getId() === point.id).init(point);
        break;
      case UpdateType.MINOR:
        this._handlePointChange(point);
        this._clearPointsList();
        this._renderPointsList();
        break;
      case UpdateType.MAJOR:
        this._clearPointsList();
        this._renderPointsList();
        break;
    }
  }

  _clearPointsList() {
    this._pointNewPresenter.destroy();
    Object.values(this._pointsPresenter).forEach((presenter) => presenter.destroy());
    this._pointsPresenter = [];
  }
}
