import express from 'express';
import passport from 'passport';
import User from '../models/user';
import validate from '../services/validate';

const router = new express.Router();

router.post('/', (req, res, next) => {
  const errors = validate({
    email: req.body.email,
    password: req.body.password
  });
  if (errors.length) {
    res.status(400);
    res.json({errors});
    return;
  }

  passport.authenticate('local-signup', (error, user, info) => {
    if (error) {
      next(error);
    }
    if (!user) {
      res.status(401);
      res.json({
        errors: [info.error]
      });
      return;
    }
    res.status(200);
    res.json({user: user.toObject()});
  })(req, res, next);
});

router.patch('/:id', (req, res, next) => {
  const userId = req.params.id;
  if (!userId) {
    res.status(400);
    res.json({
      errors: [{
        message: 'No user id provided'
      }]
    });
    return;
  }

  const username = req.body.username;
  const errors = validate({
    username
  });

  if (errors.length) {
    res.status(400);
    res.json({errors});
    return;
  }

  User.findOneAndUpdate(
    {_id: userId},
    {username},
    {new: true},
    (error, user) => {
      if (error) {
        next(error);
      }
      if (!user) {
        res.status(404);
        res.json({
          errors: [{
            message: 'User not found'
          }]
        });
        return;
      }

      res.json(user);
    }
  );
});

router.post('/login', passport.authenticate('local-login'), (req, res) => {
  const user = req.user;
  res.json({user});
});

router.post('/logout', (req) => {
  req.logout();
});

module.exports = router;
