import PointsModel from "../model/points.js";
import OffersModel from "../model/offers.js";
import DestinationsModel from "../model/destinations.js";
import {isOnline} from "../utils/common.js";

const getSyncedPoints = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.point);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
      .then((elements) => {
        const items = createStoreStructure(elements.map(OffersModel.getOffer));
        this._store.setOffersItems(items);
        return elements;
      });
    }
    const storeOffers = Object.values(this._store.getOffersItems());
    return Promise.resolve(storeOffers.map(OffersModel.getOffer));
  }

  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations()
      .then((elements) => {
        const items = createStoreStructure(elements.map(DestinationsModel.getDestination));
        this._store.getDestinationItems(items);
        return elements;
      });
    }
    const storeDestinations = Object.values(this._store.getDestinationItems());
    return Promise.resolve(storeDestinations.map(DestinationsModel.getDestination));
  }

  getPoints() {
    if (isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          const items = createStoreStructure(points.map(PointsModel.adaptToServer));
          this._store.setPointsItems(items);
          return points;
        });
    }

    const storePoints = Object.values(this._store.getPointsItems());

    return Promise.resolve(storePoints.map(PointsModel.adaptToClient));
  }

  updatePoint(point) {
    if (isOnline()) {
      return this._api.updatePoint(point)
        .then((updatedPoint) => {
          this._store.setPointItem(updatedPoint.id, PointsModel.adaptToServer(updatedPoint));
          return updatedPoint;
        });
    }

    this._store.setPointItem(point.id, PointsModel.adaptToServer(Object.assign({}, point)));

    return Promise.resolve(point);
  }

  addPoint(point) {
    if (isOnline()) {
      return this._api.addPoint(point)
        .then((newPoint) => {
          this._store.setPointItem(newPoint.id, PointsModel.adaptToServer(newPoint));
          return newPoint;
        });
    }

    return Promise.reject(new Error(`Add point failed`));
  }

  deletePoint(point) {
    if (isOnline()) {
      return this._api.deletePoint(point)
        .then(() => this._store.removePointItem(point.id));
    }

    return Promise.reject(new Error(`Delete point failed`));
  }

  sync() {
    if (isOnline()) {
      const storePoints = Object.values(this._store.getItems());

      return this._api.sync(storePoints)
        .then((response) => {
          const createdPoints = getSyncedPoints(response.created);
          const updatedPoints = getSyncedPoints(response.updated);
          const items = createStoreStructure([...createdPoints, ...updatedPoints]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}
