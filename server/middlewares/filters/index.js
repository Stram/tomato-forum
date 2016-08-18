module.exports = function(req, res, next) {
  req.filters = {
    paginateOptions: {
      page: req.query.page || 1
    }
  };
  next();
};
