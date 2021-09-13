export const makeItemsUniq = (items) => [...new Set(items)];

export const countPointsByType = (points, type) => points.filter((point) => point.type === type).length;

export const sortPriceByType = (pointPrices, type) => pointPrices.filter((point) => point.type === type);


export function getTotalPrice(pointByTypes) {
  let total = 0;
  pointByTypes.map((pointType) => total += pointType.price);
  return total;
}
