import {getRandomInteger} from "../utils/common.js";
import {formDate} from "../utils/task.js";

const PointField = {
  TYPE_POINT_DICTIONARY: {
    TAXI: `Taxi`,
    BUS: `Bus`,
    TRAIN: `Train`,
    SHIP: `Ship`,
    TRANSPORT: `Transport`,
    DRIVE: `Drive`,
    FLIGHT: `Flight`,
    CHEK_IN: `Check-in`,
    SIGHTSEEING: `Sightseeing`,
    RESTAURANT: `Restaurant`
  },
  TYPE_POINT: [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check_in`, `Sightseeing`, `Restaurant`],
  CITY_POINT: [`Gelendzhik`, `Moscow`, `St.Petersburg`, `Krasnodar`, `Sochi`, `Omsk`, `Rostov-on-Don`],
  DESCRIPTION_POINT: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`.`),
  // OPTIONS: [`Option1`, `Option2`, `Option3`, `Option4`]
  OPTIONS: {
    TAXI: [`Option1`, `Option2`],
    BUS: [`Option3`, `Option4`],
    TRAIN: [`Option5`, `Option6`],
    SHIP: [`Option7`, `Option8`],
    TRANSPORT: [`Option9`, `Option10`],
    DRIVE: [`Option11`, `Option12`],
    FLIGHT: [`Option13`, `Option14`],
    CHEK_IN: [`Option15`, `Option16`],
    SIGHTSEEING: [`Option17`, `Option18`],
    RESTAURANT: [`Option19`, `Option20`]
  }
};

const DefaultValue = {
  MIN_RANDOM_VALUE: 0,
  MAX_RANDOM_VALUE: 100,
  MIN_COUNT_PHOTO: 1,
  MAX_COUNT_PHOTO: 5,
  MIN_DESCRIPTION_VALUE: 1,
  MAX_DESCRIPTION_VALUE: 4,
  FOR_THE_RIGHT_LENGTH: 1,
  MIN_PRICE_VALUE: 0,
  MAX_PRICE_VALUE: 100000,
  MIN_YEAR_VALUE: 2020,
  MAX_YEAR_VALUE: 2021,
  MIN_MONTH_VALUE: 1,
  MAX_MONTH_VALUE: 12,
  MIN_DAY_VALUE: 1,
  MAX_DAY_VALUE: 31,
  MIN_HOUR_VALUE: 1,
  MAX_HOUR_VALUE: 23,
  MIN_MINUTE_VALUE: 1,
  MAX_MINUTE_VALUE: 59,
  FOR_BOOLEAN_VALUE: 0.5,
  MIN_TIME_VALUE_HOUR: 0,
  MAX_TIME_VALUE_HOUR: 24,
  MIN_TIME_VALUE_MINUTE: 0,
  MAX_TIME_VALUE_MINUTE: 60,
  MIN_MINUTE: 0,
  MAX_MINUTE: 60
};

const SortType = {
  DAY: `sort-day`,
  TIME: `sort-time`,
  PRICE: `sort-price`,
};

const getString = (arr, minValue) => arr[getRandomInteger(minValue, arr.length - DefaultValue.FOR_THE_RIGHT_LENGTH)];

const getDescription = () => {
  let randomDescription = ``;
  for (let i = 0; i < getRandomInteger(DefaultValue.MIN_DESCRIPTION_VALUE, DefaultValue.MAX_DESCRIPTION_VALUE); i++) {
    randomDescription += `${PointField.DESCRIPTION_POINT[getRandomInteger(DefaultValue.MIN_RANDOM_VALUE, PointField.DESCRIPTION_POINT.length - DefaultValue.FOR_THE_RIGHT_LENGTH)]}.`;
  }
  return randomDescription;
};

const getRandomPhoto = () => {
  const photos = [];
  for (let i = 0; i < getRandomInteger(DefaultValue.MIN_COUNT_PHOTO, DefaultValue.MAX_COUNT_PHOTO); i++) {
    photos.push(`http://picsum.photos/248/152?r=${getRandomInteger(DefaultValue.MIN_RANDOM_VALUE, DefaultValue.MAX_RANDOM_VALUE)}`);
  }

  return photos;
};

const getRandomDate = () => formDate(`${getRandomInteger(DefaultValue.MIN_YEAR_VALUE, DefaultValue.MAX_YEAR_VALUE)}-${getRandomInteger(DefaultValue.MIN_MONTH_VALUE, DefaultValue.MAX_MONTH_VALUE)}-${getRandomInteger(DefaultValue.MIN_DAY_VALUE, DefaultValue.MAX_DAY_VALUE)}-${getRandomInteger(DefaultValue.MIN_HOUR_VALUE, DefaultValue.MAX_HOUR_VALUE)}:${getRandomInteger(DefaultValue.MIN_MINUTE_VALUE, DefaultValue.MAX_MINUTE_VALUE)}`, `DD/MM/YY HH:mm`);

const getRandomDay = () => formDate(`${getRandomInteger(DefaultValue.MIN_YEAR_VALUE, DefaultValue.MAX_YEAR_VALUE)}-${getRandomInteger(DefaultValue.MIN_MONTH_VALUE, DefaultValue.MAX_MONTH_VALUE)}-${getRandomInteger(DefaultValue.MIN_DAY_VALUE, DefaultValue.MAX_DAY_VALUE)}`, `MMM D`);

const getRandomPrice = () => getRandomInteger(DefaultValue.MIN_PRICE_VALUE, DefaultValue.MAX_PRICE_VALUE);

const getRandomUberPrice = () => getRandomInteger(DefaultValue.MIN_PRICE_VALUE, DefaultValue.MAX_PRICE_VALUE);

const getFavoriteState = () => Math.random() >= DefaultValue.FOR_BOOLEAN_VALUE;

const getRandomTimeInHour = () => getRandomInteger(DefaultValue.MIN_TIME_VALUE_HOUR, DefaultValue.MAX_TIME_VALUE_HOUR);

const getRandomTimeOutHour = () => getRandomInteger(DefaultValue.MIN_TIME_VALUE_HOUR, DefaultValue.MAX_TIME_VALUE_HOUR);

const getRandomTimeInMinute = () => getRandomInteger(DefaultValue.MIN_TIME_VALUE_MINUTE, DefaultValue.MAX_TIME_VALUE_MINUTE);

const getRandomTimeOutMinute = () => getRandomInteger(DefaultValue.MIN_TIME_VALUE_MINUTE, DefaultValue.MAX_TIME_VALUE_MINUTE);

const getRandomDuration = () => getRandomInteger(DefaultValue.MIN_MINUTE, DefaultValue.MAX_MINUTE);

const getOptions = (type) => PointField.OPTIONS[`${type}`];

const generatePoint = () => {
  const PointType = getString(PointField.TYPE_POINT, DefaultValue.MIN_RANDOM_VALUE);
  return {
    // type: getString(PointField.TYPE_POINT, DefaultValue.MIN_RANDOM_VALUE),
    type: PointType,
    city: getString(PointField.CITY_POINT, DefaultValue.MIN_RANDOM_VALUE),
    options: getOptions(PointType.toUpperCase()),
    description: getDescription(),
    photos: getRandomPhoto(),
    dateIn: getRandomDate(),
    dateOut: getRandomDate(),
    price: getRandomPrice(),
    day: getRandomDay(),
    uberPrice: getRandomUberPrice(),
    favorite: getFavoriteState(),
    timeInHour: getRandomTimeInHour(),
    timeOutHour: getRandomTimeOutHour(),
    timeInMinute: getRandomTimeInMinute(),
    timeOutMinute: getRandomTimeOutMinute(),
    duration: getRandomDuration()
  };
};

export {
  generatePoint,
  PointField,
  SortType,
  getOptions,
  getDescription
};
