module.exports = function(req, res, next) {
  req.pagination = {
    page: req.query.page || 1,
    limit: req.query.perPage || req.query.limit || 30
  };
  next();
};
