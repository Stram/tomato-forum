import express from 'express';
import passport from 'passport';
import User from '../models/user';

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get('/:id', (req, res) => {
  userId = req.params.id;
  if (!userId) {
    res.json({error: 'No id'});
  }

  User.findOne({id}, (error, user) => {
    if (error) {
      res.json({error});
    }
    res.json(user);
  });
});

router.post('/', passport.authenticate('local-signup'), (req, res) => {
  res.json({done: 'TAADAA'});
});

router.post('/login', passport.authenticate('local-login'), (req, res) => {
  res.json({done: 'Welcome'});
});

router.patch('/', (req, res, next) => {

});

module.exports = router;
