import Category from '~/models/category';
import errors from '~/services/errors';
import { validateObjectId } from '~/services/validate';

module.exports = function(req, res, next) {
  const categoryId = req.params.categoryId;

  if (!validateObjectId(categoryId)) {
    next(new errors.BadRequest('Must provide a valid id'));
    return;
  }

  Category
  .findById(categoryId)
  .deepPopulate(['threads.owner.profilePhoto'])
  .then((thread) => {
    if (!thread) {
      next(new errors.NotFound('Thread not found'));
      return;
    }

    res.json(thread.toObject());
  }, (error) => {
    next(error);
    return;
  });
};
