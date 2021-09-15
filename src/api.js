import PointsModel from './model/points';
// import FetchAdapters from './fetch-adapters';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

//endPoint - ссылка к серверу https://15.ecmascript.pages.academy/big-trip/
//authorization - сгенерированый ключ-токен
export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFetchPoints() {
    return this._fetchData({url: 'points'})
      .then(Api.toJSON)
      .then((points) => points.map(PointsModel.adaptToClient));
    // .then((points) => points.map(FetchAdapters.adaptToClient));
  }

  updateFetchPoint(point) {
    return this._fetchData({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(PointsModel.adaptToServer(point)),
      // body: JSON.stringify(FetchAdapters.adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(PointsModel.adaptToClient);
    // .then(FetchAdapters.adaptToClient);
  }

  _fetchData({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);

    return fetch(
      `${this._endPoint}/${url}`,
      {method, body, headers},
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
