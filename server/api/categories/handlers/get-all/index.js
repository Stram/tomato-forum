import Category from 'models/category';
import paginateModel from 'util/pagination/paginate-model';

module.exports = function(req, res) {
  const options = {
    deepPopulate: 'threads.owner.profilePhoto'
  };

  paginateModel(req, res, Category, options);
};
