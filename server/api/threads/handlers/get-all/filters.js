import _ from 'lodash';

module.exports = function(req, res, next) {
  req.filters = {
    owner: req.query.owner,
    category: req.query.category
  };

  req.filters = _.omitBy(req.filters, _.isUndefined);

  next();
};
