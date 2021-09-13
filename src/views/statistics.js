import SmartView from './smart.js';
import {countPointsByType, getGraphChart, getTotalPrice, makeItemsUniq, sortPriceByType} from '../utils/statistics';

const createStatisticsTemplate = () => (
  `<section class="statistics">
          <h2 class="visually-hidden">Trip statistics</h2>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="money" width="900"></canvas>
          </div>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="type" width="900"></canvas>
          </div>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
          </div>
        </section>`
);


const renderMoneyChart = (moneyCtx, points) => {

  const pointWithPricesAndTypes = points.map((point) => ({
    price: point.basePrice,
    type: point.type,
  }));
  const pointTypeToUpperCase = pointWithPricesAndTypes.map((type) => type.type.toUpperCase());
  const pointTypeUniqToUpperCase = makeItemsUniq(pointTypeToUpperCase);

  const pointPricesByTypes = pointTypeUniqToUpperCase.map((type) => sortPriceByType(pointWithPricesAndTypes, type.toLowerCase()));
  let arrPrice = [];
  pointPricesByTypes.forEach((item) => {
    const total = getTotalPrice(item);
    return arrPrice = arrPrice.concat([total]);
  });

  return getGraphChart(
    moneyCtx,
    pointTypeUniqToUpperCase,
    arrPrice,
    'MONEY',
    '€',
    true,
  );
};

const renderTypeChart = (typeCtx, points) => {
  const pointTypes = points.map((point) => point.type);
  const uniqTypes = makeItemsUniq(pointTypes);
  const uniqTypesToUpperCase = uniqTypes.map((type) => type.toUpperCase());
  const pointsByTypeCounts = uniqTypes.map((type) => countPointsByType(points, type));

  return getGraphChart(
    typeCtx,
    uniqTypesToUpperCase,
    pointsByTypeCounts,
    'TYPE',
    'x',
    false,
  );
};

const renderTimeSpentChart = (timeSpendCtx, points) => {
  // Функция для отрисовки графика по датам

  return getGraphChart(
    timeSpendCtx,
    ['A', 'B', 'C'],
    [1,2,2],
    'TIME-SPEND',
    '',
    false,
  );
};

export default class Statistics extends SmartView {

  constructor(points) {
    super();
    this._points = points;

    this._moneyCart = null;
    this._typeChart = null;
    this._timeSpentChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    if (this._moneyCart !== null || this._typeChart !== null || this._timeSpentChart !== null) {
      this._moneyCart = null;
      this._typeChart = null;
      this._timeSpentChart = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    if (this._moneyCart !== null || this._typeChart !== null || this._timeSpentChart !== null) {
      this._moneyCart = null;
      this._typeChart = null;
      this._timeSpentChart = null;
    }
    const moneyCtx = this.getElement().querySelector('#money');
    const typeCtx = this.getElement().querySelector('#type');
    const timeSpendCtx = this.getElement().querySelector('#time-spend');

    this._moneyCart = renderMoneyChart(moneyCtx, this._points);
    this._typeChart = renderTypeChart(typeCtx, this._points);
    this._timeSpentChart = renderTimeSpentChart(timeSpendCtx, this._points);
  }
}
