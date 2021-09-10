import {FILTER_TYPES} from '../const';
import {isPointInFuture, isPointInPast, sortPointsByDay} from './point';


export const filter = {
  [FILTER_TYPES.EVERYTHING]: (points) => points.sort(sortPointsByDay),
  [FILTER_TYPES.FUTURE]: (points) => points.filter((point) => isPointInFuture(point)),
  [FILTER_TYPES.PAST]: (points) => points.filter((point) => isPointInPast(point)),
};
