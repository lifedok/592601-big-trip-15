import dayjs from 'dayjs';

export const getDate = (date) => {
  if (!date) {
    return dayjs();
  }
  return dayjs(date);
};

export const sortPointsByDay = (pointA, pointB) => (
  getDate(pointA.dateFrom).diff(getDate(pointB.dateFrom))
);

export const sortPointsByTime = (pointA, pointB) => {
  const dateFrom = (getDate(pointA.dateTo).diff(getDate(pointA.dateFrom)));
  const dateTo = (getDate(pointB.dateTo).diff(getDate(pointB.dateFrom)));
  return dateFrom - dateTo;
};

export const sortPointsByMaxDate = (pointA, pointB) => (
  getDate(pointA.dateTo).diff(getDate(pointB.dateTo))
);

export const isPointInPast = (date) => date === null ? false : getDate().isAfter(date.dateTo, 'D');
export const isPointInFuture = (date) => date === null ? false : getDate().isBefore(date.dateFrom, 'D');

export const getFormatDate = (date, template) => {
  if (!date) {
    return '';
  }
  return getDate(date).format(template); // as example DD/MM/YY HH:mm
};

export const sortPointsByPrice = (pointA, pointB) => pointA.basePrice - pointB.basePrice;


export const getDurationByData = (item) => {
  const days = ((getDate(item.dateTo).diff(getDate(item.dateFrom), 'd')) % 24);
  const hours = ((getDate(item.dateTo).diff(getDate(item.dateFrom), 'h')) % 24);
  const minutes = (getDate(item.dateTo).diff(getDate(item.dateFrom), 'm')) % 60;
  return `${days ? `${days}D ` : ''}${hours ? `${hours}H ` : ''}${minutes}M`;
};
