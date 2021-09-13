import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getDurationByData} from './common';
// import {getDate} from './point';
import dayjs from 'dayjs';

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
  let total = '';
  pointByTypes.map((pointType) => total += getDurationByData(pointType));
  console.log('total',total);
  return total;
}

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
  labels,    // array
  data,      // array
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

