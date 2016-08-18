module.exports = function(object, result) {
  object.meta = {
    page: result.page,
    total: result.total,
    pages: result.pages
  };

  return object;
};
