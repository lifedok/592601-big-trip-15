import SmartView from './smart.js';
import Chart from 'chart.js';
import {OFFER_TITTLES, POINT_TYPES} from '../const.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

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


export const countPointsByType = (points, type) => points.filter((point) => point.type === type).length;
export const countPointsByPrice = (points, price) => points.filter((point) => point.basePrice === price).length;

export const makeItemsUniq = (items) => [...new Set(items)];

const renderMoneyChart = (moneyCtx, points) => {
  // const pointPrices = points.map((point) => point.basePrice);
  // const uniqPrice = makeItemsUniq(pointPrices);
  // console.log('TETS ===> uniqPrice',uniqPrice);
  // const uniqTypePriceToUpperCase = uniqPrice.map((type) => type.toUpperCase());
  // const pointsByPriceCounts = uniqPrice.map((price) => countPointsByPrice(points, price));

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: ['A', 'B'],
      datasets: [{
        data: ['200', '500'],
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
  console.log('renderTimeSpentChart timeSpendCtx', timeSpendCtx);
  console.log('renderTimeSpentChart points', points);
  // Функция для отрисовки графика по датам
};

export default class Statistics extends SmartView {

  constructor(points) {
    super();

    this._moneyCart = null;
    this._typeChart = null;
    this._timeSpentChart = null;

    this._data = {
      points,
      // По условиям техзадания по умолчанию интервал - неделя от текущей даты
      // dateFrom: (() => {
      //   // const daysToFullWeek = 6;
      //   // return dayjs().subtract(daysToFullWeek, 'day').toDate();
      // })(),
      // dateTo: dayjs().toDate(),
    };

    // this._dateChangeHandler = this._dateChangeHandler.bind(this);

    this._setCharts();
    // this._setDatepicker();
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
    // this._setDatepicker();
  }

  // _dateChangeHandler([dateFrom, dateTo]) {
  //   if (!dateFrom || !dateTo) {
  //     return;
  //   }
  //
  //   this.updateData({
  //     dateFrom,
  //     dateTo,
  //   });
  // }

  // _setDatepicker() {
  //   if (this._datepicker) {
  //     this._datepicker.destroy();
  //     this._datepicker = null;
  //   }
  //
  //   this._datepicker = flatpickr(
  //     this.getElement().querySelector('.statistic__period-input'),
  //     {
  //       mode: 'range',
  //       dateFormat: 'j F',
  //       defaultDate: [this._data.dateFrom, this._data.dateTo],
  //       onChange: this._dateChangeHandler,
  //     },
  //   );
  // }

  _setCharts() {
    // Нужно отрисовать три графика
    if (this._moneyCart !== null || this._typeChart !== null || this._timeSpentChart !==null) {
      this._moneyCart = null;
      this._typeChart = null;
      this._timeSpentChart = null;
    }
    const {points} = this._data;
    const moneyCtx = this.getElement().querySelector('#money');
    const typeCtx = this.getElement().querySelector('#type');
    const timeSpendCtx = this.getElement().querySelector('#time-spend');

    console.log('moneyCtx', moneyCtx);
    console.log('typeCtx', typeCtx);
    console.log('timeSpendCtx', timeSpendCtx);

    this._moneyCart = renderMoneyChart(moneyCtx, points);
    this._typeChart = renderTypeChart(typeCtx, points);
    this._timeSpentChart = renderTimeSpentChart(timeSpendCtx, points);
  }
}
