module.exports = function(req, res, next) {
  const page = parseInt(req.query.page, 10);
  const perPage = parseInt(req.query.perPage, 10);
  const limit = parseInt(req.query.limit, 10);

  req.pagination = {
    page: page || 1,
    limit: perPage || limit || 30
  };
  next();
};
