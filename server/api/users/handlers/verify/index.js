import errors from '~/services/errors';

import User from '~/models/user';

module.exports = function(req, res, next) {
  const userId = req.body.userId;
  const token = req.body.token;
  const username = req.body.username;

  User.findOne({_id: userId}, (error, user) => {
    if (error) {
      next(error);
      return;
    }

    if (!user) {
      next(new errors.NotFound('User not found'));
      return;
    }

    if (user.token !== token) {
      next(new errors.BadRequest('Token is not valid'));
      return;
    }

    User.findOne({username}, (sameUsernameError, sameUsernameUser) => {
      if (sameUsernameError) {
        next(sameUsernameError);
      }
      if (sameUsernameUser) {
        next(new errors.BadRequest('Username is already taken'));
        return;
      }

      user.username = username;
      user.token = null;

      user.save().then((changedUser) => {
        res.json({user: changedUser.toObject()});
      }, (err) => {
        next(err);
        return;
      });
    });
  });
};
