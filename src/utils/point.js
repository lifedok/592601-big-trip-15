import dayjs from 'dayjs';

export const sortPointsByDay = (pointA, pointB) => (
  dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom))
);

export const sortPointsByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export const formatPointDate = (date) => {
  if (!date) {
    return '';
  }

  return dayjs(date).format('D MMMM');
};
