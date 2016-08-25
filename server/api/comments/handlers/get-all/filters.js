import _ from 'lodash';

module.exports = function(req, res, next) {
  req.filters = {
    owner: req.query.owner,
    thread: req.query.thread
  };

  req.filters = _.omitBy(req.filters, _.isUndefined);

  next();
};
