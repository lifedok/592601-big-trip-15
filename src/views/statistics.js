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
export const sortPriceByType = (pointPrices, type) => pointPrices.filter((point) => point.type === type);



export const makeItemsUniq = (items) => [...new Set(items)];

const renderMoneyChart = (moneyCtx, points) => {


  const pointPricesByType = points.map((point) => ({
    price: point.basePrice,
    type: point.type, // получаю объект всех цен и типов
  }));
  console.log('TETS ===> pointPricesByType',pointPricesByType);

  // создаю уникальный массив типов и полученного объекта и перевожу в апперкейс
  const pointTypeToUpperCase = pointPricesByType.map((type) => type.type.toUpperCase());
  const pointTypeToUpperCaseUniq = makeItemsUniq(pointTypeToUpperCase);

  function getTotalPrice(pointByTypes) {
    let total = 0;
    console.log('TETS ===> pointByTypes',pointByTypes);
    console.log('TETS ===> pointByTypes.length',pointByTypes.length);

    for(let item = 0; item <= pointByTypes.length; item++){
      pointByTypes.map((point) => total += point.price);
    }
    return total;
  }

  const pointPricesByTypeSum = pointTypeToUpperCaseUniq.map((type) => sortPriceByType(pointPricesByType, type.toLowerCase()));
  const arrayPriceByTypes = [];
  pointPricesByTypeSum.forEach((item) => {
    // console.log('item', ...item);
    // const totalSum = () => let sum = 0; sum += i;
    // arrayPriceByTypes.push((item) => getTotalPrice(item));
    const total = getTotalPrice(item);
    console.log('total', total);
    return arrayPriceByTypes;
  });

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: pointTypeToUpperCaseUniq,
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
