import SmartView from './smart.js';
import Chart from 'chart.js';
import {OFFER_TITTLES, POINT_TYPES} from '../const.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {countPointsByType, getTotalPrice, makeItemsUniq, sortPriceByType} from '../utils/statistics';

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


  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: pointTypeUniqToUpperCase,
      datasets: [{
        data: arrPrice,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTypeChart = (typeCtx, points) => {
  const pointTypes = points.map((point) => point.type);
  const uniqTypes = makeItemsUniq(pointTypes);
  const uniqTypesToUpperCase = uniqTypes.map((type) => type.toUpperCase());
  const pointsByTypeCounts = uniqTypes.map((type) => countPointsByType(points, type));

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: uniqTypesToUpperCase,
      datasets: [{
        data: pointsByTypeCounts,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimeSpentChart = (timeSpendCtx, points) => {
  // console.log('renderTimeSpentChart timeSpendCtx', timeSpendCtx);
  // console.log('renderTimeSpentChart points', points);
  // Функция для отрисовки графика по датам
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

    if (this._moneyCart !== null || this._typeChart !== null || this._timeSpentChart !==null) {
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
    if (this._moneyCart !== null || this._typeChart !== null || this._timeSpentChart !==null) {
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
