import Comment from '~/models/comment';
import paginateModel from '~/util/pagination/paginate-model';

module.exports = function(req, res) {
  paginateModel(req, res, Comment);
};
