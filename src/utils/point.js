import dayjs from 'dayjs';

export const sortPointsByDay = (pointA, pointB) => (
  dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom))
);

export const sortPointsByPrice = (pointA, pointB) => {
  if (pointA.basePrice > pointB.basePrice) {
    return -1;
  }
  if (pointA.basePrice < pointB.basePrice) {
    return 1;
  }
  if (pointA.basePrice === pointB.basePrice) {
    return 0;
  }
};
