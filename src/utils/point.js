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

export const getFormatDate = (date, template) => {
  if (!date) {
    return '';
  }
  return getDate(date).format(template); // as example DD/MM/YY HH:mm
};

export const sortPointsByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;
