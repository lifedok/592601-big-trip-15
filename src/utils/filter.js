import {FILTER_TYPES} from '../const';
import {isPointInFuture, isPointInPast} from './point';


export const filter = {
  [FILTER_TYPES.EVERYTHING]: (points) => points, //.filter((point) => sortPointsByDay(point)),
  [FILTER_TYPES.FUTURE]: (points) => points.filter((point) => isPointInFuture(point)),
  [FILTER_TYPES.PAST]: (points) => points.filter((point) => isPointInPast(point)),
};
