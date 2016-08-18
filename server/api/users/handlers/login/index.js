import passport from 'passport';

import errors from '~/services/errors';

module.exports = function(req, res, next) {
  passport.authenticate('local-login', (error, user, info) => {
    if (error) {
      next(error);
      return;
    }
    if (!user) {
      next(new errors.BadRequest(info));
      return;
    }

    res.status(200);
    res.json({user: user.toObject()});
  })(req, res, next);
};
