import passport from 'passport';

import mailer from 'services/mailer';
import errors from 'services/errors';

module.exports = function(req, res, next) {
  passport.authenticate('local-register', (error, user, info) => {
    if (error) {
      next(error);
      return;
    }
    if (!user) {
      next(new errors.BadRequest(info));
      return;
    }

    mailer.sendVerification(user);

    res.status(200);
    res.json({user: user.toObject()});
  })(req, res, next);
};
