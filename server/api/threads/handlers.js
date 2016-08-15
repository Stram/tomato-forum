import Category from '../../models/category';
import Thread from '../../models/thread';

import errors from '../../services/errors';

module.exports = {
  createThread(req, res, next) {
    Category.findById(req.body.categoryId, (categoryError, category) => {
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
  },

  getThreads(req, res) {
    Thread.find().then((threads) => {
      res.json(threads.map((thread) => thread.toObject()));
    });
  },

  getThread(req, res) {
    Thread
    .findById(req.params.threadId)
    .populate({path: 'owner', populate: {path: 'profilePhoto'}})
    .populate({path: 'comments', populate: {path: 'user', populate: {path: 'profilePhoto'}}})
    .then((thread) => {
      if (thread) {
        res.json(thread.toObject());
      } else {
        res.status(404);
        res.send();
      }
    });
  }

};
