import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
import {getRandomInteger} from "./common.js";

dayjs.extend(duration);

export const ValueForRandom = {
  ZERO: 0,
  HUNDRED: 100
};

export const getPhoto = (photos) => {
  const reducer = (element, photo) => element + `<img class="event__photo" src="${photo}" alt="Event photo">`;

  let imgElement = ``;

  return photos.reduce(reducer, imgElement);
};

export const getOffers = (options) => {
  const reducer = (element, option) => element + `<div class="event__offer-selector">
         <input class="event__offer-checkbox  visually-hidden" id="event-offer-${option}-1" type="checkbox"
           name="event-offer-${option}" checked>
         <label class="event__offer-label" for="event-offer-${option}-1">
           <span class="event__offer-title">${option}</span>
           &plus;&euro;&nbsp;
           <span class="event__offer-price">${getRandomInteger(ValueForRandom.ZERO, ValueForRandom.HUNDRED)}</span>
         </label>
       </div>`;

  let offersElement = ``;

  return options.reduce(reducer, offersElement);
};

export const formDate = (value, format) => dayjs(value).format(format);

export const sortByDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
export const sortByTime = (pointA, pointB) => pointA.duration - pointB.duration;
export const sortByPrice = (pointA, pointB) => pointA.price - pointB.price;

export const getDuration = (dateFrom, dateTo) => {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom));
  const diffDuration = dayjs.duration(diff);

  const days = diffDuration.days();
  const hours = diffDuration.hours();
  const minutes = diffDuration.minutes();

  let durationToRender = ``;

  if (days > 0) {
    durationToRender += `${days}D `;
  }
  if (hours > 1) {
    durationToRender += `${hours}H `;
  }
  if (minutes > 0) {
    durationToRender += `${minutes}M`;
  }

  return durationToRender;
};
