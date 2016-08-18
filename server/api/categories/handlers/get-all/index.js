import Category from '~/models/category';
import metaInfo from '~/middlewares/pagination/meta-info';

module.exports = function(req, res) {
  const paginationOptions = req.pagination || {};
  const filterOptions = req.filters || {};

  Category
  .paginate(filterOptions, paginationOptions)
  .deepPopulate('threads.owner.profilePhoto')
  .then((result) => {

    const categories = result.docs;
    const response = metaInfo({
      categories: categories.map((category) => category.toObject())
    }, result);

    res.json(response);
  });
};
