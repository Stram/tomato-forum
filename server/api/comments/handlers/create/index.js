import Comment from '~/models/comment';
import Thread from '~/models/thread';
import errors from '~/services/errors';
import { validateObjectId } from '~/services/validate';

module.exports = function(req, res, next) {
  const threadId = req.body.threadId;

  if (!validateObjectId(threadId)) {
    next(new errors.BadRequest('Must provide a valid thread id'));
    return;
  }

  Thread.findById(threadId, (findError, thread) => {

    if (findError) {
      next(findError);
      return;
    }
    if (!thread) {
      next(new errors.BadRequest('Thread id not valid'));
      return;
    }

    const newComment = new Comment({
      content: req.body.content,
      owner: req.user.id,
      thread
    });

    thread.comments.push(newComment);

    Promise.all([newComment.save(), thread.save()]).then(([savedComment]) => {

      // TODO: fix deep population
      // savedComment.deepPopulate('user.profilePhoto');

      res.status(201);
      res.json({
        comment: savedComment.toObject()
      });

    }, (error) => {
      next(error);
    });
  });

};
