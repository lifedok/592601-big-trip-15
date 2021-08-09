export const createTripInfoHeaderTemplate = (listEvent) => {

  const total = () => listEvent.reduce((prev, curr) => prev + curr.basePrice, 0);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

        <p class="trip-info__dates">${listEvent[0].dateFrom.format('MMM D')}&nbsp;&mdash;&nbsp;${listEvent[listEvent.length-1].dateTo.format('D')}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${total()}</span>
      </p>
  </section>
  `);
};
