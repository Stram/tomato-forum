import _ from 'lodash';
import metaInfo from './meta-info';

function sendResponse(docs, result, res) {
  const response = metaInfo({
    items: docs.map((doc) => doc.toObject())
  }, result);

  res.json(response);
}

module.exports = function(req, res, Model, options = {}) {
  const paginationOptions = req.pagination || {};
  const filterOptions = req.filters || {};

  Model
  .paginate(filterOptions, paginationOptions)
  .then((result) => {

    const docs = result.docs;

    // TODO: fix deep population
    const deepPopulated = [];
    if (options.deepPopulate) {
      docs.forEach((doc) => {
        deepPopulated.push(doc.deepPopulate(options.deepPopulate));
      });
    }
    if (_.isEmpty(deepPopulated)) {
      sendResponse(docs, result, res);
    } else {
      Promise.all(deepPopulated).then(() => {
        sendResponse(docs, result, res);
      });
    }
  });
};
