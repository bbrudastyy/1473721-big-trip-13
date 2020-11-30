import dayjs from "dayjs";

const ValueForRandom = {
  ZERO: 0,
  HUNDRED: 100
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


const getPhoto = (photos) => {
  const reducer = (element, photo) => element + `<img class="event__photo" src="${photo}" alt="Event photo">`;

  let imgElement = ``;

  return photos.reduce(reducer, imgElement);
};

const getOffers = (options) => {
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

const formDate = (value, format) => dayjs(value).format(format);

export { getRandomInteger, getPhoto, getOffers, formDate };