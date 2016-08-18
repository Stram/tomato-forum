import Thread from '~/models/thread';
import errors from '~/services/errors';
import { validateObjectId } from '~/services/validate';

module.exports = function(req, res, next) {
  const threadId = req.params.threadId;

  if (!validateObjectId(threadId)) {
    next(new errors.BadRequest('Must provide a valid id'));
    return;
  }

  Thread
  .findById(threadId)
  .deepPopulate(['owner.profilePhoto', 'comments.user.profilePhoto'])
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
