import metaInfo from './meta-info';

module.exports = function(req, res, Model, options = {}) {
  const paginationOptions = req.pagination || {};
  const filterOptions = req.filters || {};

  Model
  .paginate(filterOptions, paginationOptions)
  .then((result) => {

    const docs = result.docs;

    // TODO: fix deep population
    if (options.deepPopulate) {
      docs.forEach((doc) => {
        doc.deepPopulate(options.deepPopulate);
      });
    }
    const response = metaInfo({
      items: docs.map((doc) => doc.toObject())
    }, result);

    res.json(response);
  });
};
