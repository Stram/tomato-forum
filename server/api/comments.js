import express from 'express';

import Comment from '../models/comment';
import Thread from '../models/thread';

const router = new express.Router();

// NEW COMMENT

router.post('/', (req, res, next) => {
  Thread.findById(req.body.thread.id, (findError, thread) => {
    if (findError) {
      next(findError);
      return;
    }
    if (!thread) {
      res.status(404);
      return;
    }

    const newComment = new Comment({
      content: req.body.content,
      user: req.user.id,
      thread,
      createdAt: new Date()
    });

    newComment.save((savingError) => {
      if (savingError) {
        next(savingError);
        return;
      }

      thread.comments.push(newComment);

      thread.save((threadSaveError) => {
        if (threadSaveError) {
          next(threadSaveError);
          return;
        }

        Comment.populate(newComment, {
          path: 'user',
          populate: {
            path: 'profilePhoto'
          }
        }).then((comment) => {
          res.json(comment.toObject());
        });
      });
    });
  });
});

module.exports = router;
