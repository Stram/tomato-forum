import express from 'express';
import passport from 'passport';
import User from '../models/user';
import validate from '../services/validate';

const router = new express.Router();

router.use((req, res, next) => {
  next();
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    res.json({error: 'No id'});
  }

  User.findOne({id: userId}, (error, user) => {
    if (error) {
      res.json({error});
    }
    res.json(user);
  });
});

router.post('/', (req, res, next) => {
  const errors = validate({
    email: req.body.email,
    password: req.body.password
  });
  if (errors.length) {
    res.status(400);
    res.json({
      errors
    });
    return;
  }

  passport.authenticate('local-signup', (error, user, info) => {
    if (error) {
      next(error);
    }
    if (!user) {
      res.status(401);
      res.json({
        error: info.message
      });
      return;
    }
    res.status(200);
    res.json({user});
  })(req, res, next);
});

router.post('/login', passport.authenticate('local-login'), (req, res) => {
  const user = req.user;
  res.json({user});
});

router.post('/logout', (req) => {
  req.logout();
});

module.exports = router;
