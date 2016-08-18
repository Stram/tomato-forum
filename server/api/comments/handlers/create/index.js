import Comment from '~/models/comment';
import Thread from '~/models/thread';

import errors from '~/services/errors';

module.exports = function(req, res, next) {
  Thread.findById(req.body.thread.id, (findError, thread) => {
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
      user: req.user.id,
      thread,
      createdAt: new Date()
    });

    thread.comments.push(newComment);

    Promise.all([newComment.save(), thread.save()]).then(() => {

      res.status(201);

      newComment
      .deepPopulate('user.profilePhoto')
      .then((comment) => {
        res.json(comment.toObject());
      });

    }, (error) => {
      next(error);
    });
  });

};
