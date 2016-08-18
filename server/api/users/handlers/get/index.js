import errors from '~/services/errors';
import { validateObjectId } from '~/services/validate';

import User from '~/models/user';

module.exports = function(req, res, next) {
  const userId = req.params.userId;

  if (!validateObjectId(userId)) {
    next(new errors.BadRequest('Must provide a valid id'));
    return;
  }

  User.findById(userId).then((user) => {
    if (!user) {
      next(new errors.NotFound('User not found'));
    }

    res.json(user.toObject());
  }, (error) => {
    if (error) {
      next(error);
    }
  });
};
