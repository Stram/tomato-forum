import _ from 'underscore';

let params;

function parseParams() {
  params = {};
  const query = window.location.search;

  const urlParamsArr = _.map(window.decodeURI(query).substring(1, query.length).split('&'), (par) => par.split('='));

  _.each(urlParamsArr, (urlParam) => {
    if (urlParam.length === 2) {
      const key = urlParam[0];
      const val = urlParam[1];
      params[key] = val;
    }
  });
}

export function getParam(key) {
  if (!params) {
    parseParams();
  }
  return params[key];
}
