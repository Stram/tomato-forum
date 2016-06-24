import express from 'express';
import passport from 'passport';
import User from '../models/user';

const router = express.Router();

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

router.post('/', passport.authenticate('local-signup'), (req, res) => {
  const user = req.user;
  res.json({user});
});

router.post('/login', passport.authenticate('local-login'), (req, res) => {
  const user = req.user;
  res.json({user});
});

router.post('/logout', passport.authenticate('local-login'), (req) => {
  req.logout();
});

module.exports = router;
