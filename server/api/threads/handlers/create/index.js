import Category from '~/models/category';
import Thread from '~/models/thread';
import errors from '~/services/errors';
import { validateObjectId } from '~/services/validate';

module.exports = function(req, res, next) {
  const categoryId = req.body.categoryId;

  if (!validateObjectId(categoryId)) {
    next(new errors.BadRequest('Must provide a valid category id'));
    return;
  }

  Category.findById(categoryId, (categoryError, category) => {
    if (categoryError) {
      next(categoryError);
      return;
    }

    if (!category) {
      next(new errors.BadRequest('Category id not valid'));
      return;
    }

    const newThread = new Thread({
      category,
      title: req.body.title,
      content: req.body.content,
      owner: req.user.id
    });

    category.threads.push(newThread);

    Promise.all([newThread.save(), category.save()]).then(() => {

      res.status(201);
      res.json({
        thread: newThread.toObject()
      });

    }, (error) => {
      next(error);
    });
  });
};
