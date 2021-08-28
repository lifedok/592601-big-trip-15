import dayjs from 'dayjs';

export const sortPointsByDay = (pointA, pointB) => (
  dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom))
);

export const sortPointsByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export const getDate = (date) => {
  if (!date) {
    return dayjs();
  }
  return dayjs(date);
};

export const getFormatDate = (date, template) => {
  if (!date) {
    return '';
  }
  return getDate(date).format(template); // as example DD/MM/YY HH:mm
};
