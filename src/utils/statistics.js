import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getDurationByData} from './common';
// import {getDate} from './point';
import dayjs from 'dayjs';
import {getDate} from './point';

export const makeItemsUniq = (items) => [...new Set(items)];

export const countPointsByType = (points, type) => points.filter((point) => point.type === type).length;

export const sortPriceByType = (pointPrices, type) => pointPrices.filter((point) => point.type === type);

export const sortDataByType = (pointData, type) => pointData.filter((point) => point.type === type);

export function getTotalPrice(pointByTypes) {
  let total = 0;
  pointByTypes.map((pointType) => total += pointType.price);
  return total;
}

// export function getTotalDate(pointByTypes) {
//   let dateFrom = '';
//   let dateTo = '';
//   pointByTypes.map((pointType) => {
//     dateFrom += pointType.dateFrom;
//     dateTo += pointType.dateTo;
//   });
//   return total;
// }
//
export function getTotalDate(pointByTypes) {
  // let total = '';
  // pointByTypes.map((pointType) => {
  //   const duration = getDurationByData(pointType);
  //   console.log('duration',duration);
  //   return total += duration;
  // });
  // console.log('total',total);
  return getDurationInMs(pointByTypes);
}


export const getDurationInMs = (points) => {
  let total = [];
  let duration = 0;
  let totalDay = 0;
  let totalHours = 0;
  let totalMinutes = 0;
  let totalDateTo = 0;
  let totalDateFrom = 0;
  points.map((point) => {
    // const mlsDateTo = Date.parse(point.dateTo);
    // const mlsDateFrom = Date.parse(point.dateFrom);
    duration += (point.dateTo - point.dateFrom);

    totalDateTo += getDate(point.dateTo);
    totalDateFrom += getDate(point.dateFrom);


    const days = ((getDate(point.dateTo).diff(getDate(point.dateFrom), 'd')) % 24);
    const hours = ((getDate(point.dateTo).diff(getDate(point.dateFrom), 'h')) % 24);
    const minutes = (getDate(point.dateTo).diff(getDate(point.dateFrom), 'm')) % 60;

    totalDay += days;
    totalHours += hours;
    totalMinutes += minutes;
    console.log('totalDateTo 1', totalDateTo);
    // console.log('totalDateFrom 2', totalDateFrom);
    // console.log('totalHours', totalHours);
    // console.log('totalMinutes', totalMinutes);
    // return total += duration;
    // return total = (`${totalDay}D ${totalHours}H ${totalMinutes}M`);
  });
  // console.log('total', total);
  console.log('totalDateTo 2', totalDateTo);
  // console.log('totalDateFrom', totalDateFrom);
  // const days = (totalDateTo.diff(totalDateFrom, 'd') % 24);
  // const hours = (totalDateTo.diff(totalDateFrom, 'h') % 24);
  // const minutes = (totalDateTo.diff(totalDateTo, 'm')) % 60;

  // console.log('days 2', days);
  console.log('duration 2', duration );
  // console.log('hours 2', hours);
  // console.log('minutes 2', minutes);
  // totalDateTo.diff(totalDateFrom)

  // return (`${totalDay}D ${totalHours}H ${totalMinutes}M`);
  return duration;
};

// const getDuration = (pointType) => {
//   console.log('pointType',pointType);
//   const day = dayjs.duration(1, 'd');
//   console.log('day',day);
//
//
//   return pointType.dateFrom;
// };
// export function getTotalDate(pointByTypes) {
//   let total = '';
//   pointByTypes.map((pointType) => total += getDuration(pointType));
//   console.log('total',total);
//   return total;
// }


export const getGraphChart = (
  context,   // htmlElement
  labels,    // string[]
  data,      // number[]
  titleText, // string
  formatter, // string
  carency,   // boolean
) => {
  const getFormatter = (val) => carency ? val + formatter : formatter + val;
  return (
    new Chart(context, {
      plugins: [ChartDataLabels],
      type: 'horizontalBar',
      data: {
        labels: labels,
        datasets: [{
          data: data,
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
            formatter: (val) => getFormatter(val),
          },
        },
        title: {
          display: true,
          text: titleText,
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
    })
  );
};

// const monthTo = point.dateTo.getUTCMonth();
// const monthFrom = point.dateFrom.getUTCMonth();
//
// const dayTo = point.dateTo.getUTCDay();
// const dayFrom = point.dateFrom.getUTCDay();
//
// const hourTo = point.dateTo.getUTCHours();
// const hourFrom = point.dateFrom.getUTCHours();
//
// const minTo = point.dateTo.getUTCMinutes();
// const minFrom = point.dateFrom.getUTCMinutes();
//
// const diffMonth = monthTo - monthFrom === 0 ? '' : `${monthTo - monthFrom}M`;
// const diffDay = dayTo - dayFrom === 0 ? '' : `${dayTo - dayFrom}D`;
// const diffHour = hourTo - hourFrom === 0 ? '' : `${hourTo - hourFrom}H`;
// const diffMin = minTo - minFrom === 0 ? '' : `${minTo - minFrom}M`;
//
// const date = `${diffMonth} ${diffDay} ${diffHour} ${diffMin}`;
// console.log('date', date);

